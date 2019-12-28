import AbstractStatefulVideo from 'zb/device/abstract-stateful-video';
import {PrepareOption, State} from 'zb/device/interfaces/i-stateful-video';
import {ResolutionInfoItem} from 'zb/device/resolutions';
import {Type as DRMType} from 'zb/device/drm/drm';
import PlayReadyClient from 'zb/device/drm/playready-client';
import VerimatrixClient from 'zb/device/drm/verimatrix-client';
import UnsupportedFeature from 'zb/device/errors/unsupported-feature';
import ViewPort from './view-port';
import {isGTE} from './version-utils';
import {AVPlayPlayerState, AVPlayDrmType, AVPlayStreamingPropertyType} from './consts/avplay';
import BaseDrmHook from './base-drm-hook';
import PlayReadyHook from './playready-hook';
import VerimatrixHook from './verimatrix-hook';

const {
	IDLE,
	LOADING,
	READY,
	PLAYING,
	PAUSED,
	WAITING,
	SEEKING,
	ENDED,
	ERROR,
	INVALID,
	DESTROYED
} = State;


/**
 */
export default class StatefulVideo extends AbstractStatefulVideo {
	/**
	 * @param {ResolutionInfoItem} panelResolution
	 * @param {ResolutionInfoItem} appResolution
	 * @param {string} version
	 */
	constructor(panelResolution, appResolution, version) {
		super(panelResolution, appResolution);

		/**
		 * @type {AVPlay}
		 * @protected
		 */
		this._avplay = window.webapis.avplay;

		/**
		 * @type {AudioControlManager}
		 * @protected
		 */
		this._audiocontrol = window.tizen.tvaudiocontrol;

		/**
		 * @type {HTMLObjectElement}
		 * @protected
		 */
		this._videoObject;

		/**
		 * @type {string}
		 * @protected
		 */
		this._version = version;

		/**
		 * @type {?State}
		 * @protected
		 */
		this._stateBeforeSeeking = null;

		/**
		 * @type {string}
		 * @protected
		 */
		this._avplayState;

		/**
		 * @type {?number}
		 * @protected
		 */
		this._cachedScreenSaverState = null;

		/**
		 * @type {number}
		 * @protected
		 */
		this._aplayStateInterval = -1;

		/**
		 * @type {boolean}
		 * @protected
		 */
		this._avplayCallbackActive = false;

		/**
		 * @type {?State}
		 * @protected
		 */
		this._stateBeforeWaiting = null;

		/**
		 * @type {number}
		 * @protected
		 */
		this._playbackRate = 1;

		/**
		 * @type {?string}
		 * @protected
		 */
		this._url = null;

		/**
		 * @type {ViewPort}
		 * @protected
		 */
		this._viewport = null;

		/**
		 * @type {Map<DRMType|string, BaseDrmHook>}
		 * @protected
		 */
		this._drmHooks = new Map();

		/**
		 * @type {function()}
		 * @protected
		 */
		this._onErrorBound = /** @type {function()} */ (this._onError.bind(this));

		/**
		 * There are three indicators we get that say video was loaded:
		 * - preparesAsync() callback
		 * - READY state
		 * - "onbufferingcomplete" hook
		 * None actually mean much. We're going to wait for all three to happen before declaring state as ready
		 * For "bufferingcomplete" we assume true at start until we get "bufferingstart" event
		 * @type {{
		 *     prepareCallback: boolean,
		 *     readyState: boolean,
		 *     bufferingComplete: boolean
		 * }}
		 * @protected
		 */
		this._isReady;
		this._clearReady();

		this._onDRMErrorBound = (event, error) => this._onDRMError(error);
		this._manageScreenSaverBound = (event, newState) => this._manageScreenSaver(newState);

		try {
			this._init();
		} catch (e) {
			this._stateMachine.setState(INVALID);
			throw e;
		}

		const guard = (method) => (...params) => this._failToErrorState(() => method.apply(this, params));
		// When we encounter State Machine errors in interface methods it's user's responsibility
		// If state errors happen in callbacks however it means Video implementation is erroneous
		this._onPreparedCallback = guard(this._onPreparedCallback);
		this._onSeekCompletedCallback = guard(this._onSeekCompletedCallback);
		this._onAVPlayBufferingStart = guard(this._onAVPlayBufferingStart);
		this._onAVPlayBufferingComplete = guard(this._onAVPlayBufferingComplete);
		this._onAVPlayCurrentTime = guard(this._onAVPlayCurrentTime);
		this._onAVPlayStreamCompleted = guard(this._onAVPlayStreamCompleted);
		this._onMaybeReady = guard(this._onMaybeReady);
		this._onAVPlayStateChangeDetected = guard(this._onAVPlayStateChangeDetected);
	}

	/**
	 * @override
	 */
	prepare(url, options = {}) {
		this._stateMachine.startTransitionTo(LOADING);

		if (Boolean(options[PrepareOption.IS_4K]) && !window.webapis.productinfo.isUdPanelSupported()) {
			this._onError(new Error('4K is not supported'));
		}
		if (
			Boolean(options[PrepareOption.IS_8K]) &&
			!(window.webapis.productinfo.is8KPanelSupported && window.webapis.productinfo.is8KPanelSupported())
		) {
			this._onError(new Error('8K is not supported'));
		}

		this._failToErrorState(() => this._avplay.open(url));

		this._url = url;
		this._checkAVPlayStateChange();

		const prepare = () => {
			const is4K = Boolean(options[PrepareOption.IS_4K] || options[PrepareOption.IS_8K]);
			if (is4K && !isGTE(this._version, '5.0.0')) {
				this._avplay.setStreamingProperty(AVPlayStreamingPropertyType.SET_MODE_4K, 'TRUE');
			}

			if (PrepareOption.START_POSITION in options) {
				// Despite what docs claim this operation seems to be synchronous in IDLE state
				// and callbacks are never actually called
				this._avplay.seekTo(/** @type {number} */ (options[PrepareOption.START_POSITION]));
			}
			this._viewport.updateViewPort();
			this._avplay.prepareAsync(() => this._onPreparedCallback(), this._onErrorBound);
		};

		if (this._drmHooks.size) {
			Promise.all(
				Array.from(this._drmHooks.values()).map((hook) => hook.prepare())
			)
				.then(prepare, (error) => {
					if (this._stateMachine.isIn(DESTROYED) || this._stateMachine.isTransitingTo(DESTROYED)) {
						// Safe to ignore
						console.error(error); // eslint-disable-line no-console
						this._fireEvent(this.EVENT_DEBUG_MESSAGE, error.message);
					} else {
						this._onError(error instanceof Error ? error : new Error(error));
					}
				});
		} else {
			prepare();
		}

		this._stateMachine.setState(LOADING);
	}

	/**
	 * @override
	 */
	play() {
		this._fireEvent(this.EVENT_WILL_PLAY);
		this._stateMachine.startTransitionTo(PLAYING);
		this._failToErrorState(() => this._avplay.play());
		// See if it changed synchronously so that we can transit to PLAYING immediately
		this._checkAVPlayStateChange();
	}

	/**
	 * @override
	 */
	pause() {
		this._fireEvent(this.EVENT_WILL_PAUSE);
		this._stateMachine.startTransitionTo(PAUSED);
		this._failToErrorState(() => this._avplay.pause());
		this._checkAVPlayStateChange();
	}

	/**
	 * @override
	 */
	stop() {
		this._fireEvent(this.EVENT_WILL_STOP);
		this._clearReady();

		const wasAlreadyIdle = this._avplay.getState() === AVPlayPlayerState.IDLE;
		this._failToErrorState(() => this._avplay.stop());
		this._failToErrorState(() => this._avplay.close());

		this._url = null;
		this._playbackRate = 1;

		// If stop() was called before AVPlay left IDLE for the first time (i.e. during prepareAsync)
		// we're not going to get any other confirmation, so assume we're in the clear already.
		if (wasAlreadyIdle) {
			this._stateMachine.setState(IDLE);
		} else {
			this._stateMachine.startTransitionTo(IDLE);
		}
		this._checkAVPlayStateChange();
	}

	/**
	 * @override
	 */
	getPosition() {
		return this._avplay.getCurrentTime();
	}

	/**
	 * @override
	 */
	setPosition(position) {
		this._fireEvent(this.EVENT_WILL_SEEK, position);
		this._stateBeforeSeeking = this._stateMachine.getCurrentState();
		this._avplay.seekTo(position, () => this._onSeekCompletedCallback(), this._onErrorBound);
		this._stateMachine.setState(SEEKING);
	}

	/**
	 * @override
	 */
	destroy() {
		this._stateMachine.abortPendingTransition();
		this._stateMachine.startTransitionTo(DESTROYED);

		this._clearReady();

		try {
			this._avplay.stop();
		} catch (e) {
			// Not much to do if this failed, we need to destroy as much as we can
			console.error(e); // eslint-disable-line no-console
			this._fireEvent(this.EVENT_DEBUG_MESSAGE, e.message);
		}

		// Finalize operation on DRM must be called precisely between stop() and close()
		for (const hook of this._drmHooks.values()) {
			hook.off(hook.EVENT_ERROR, this._onDRMErrorBound);
			hook.destroy();
		}
		this._drmHooks.clear();

		try {
			this._avplay.close();
		} catch (e) {
			console.error(e); // eslint-disable-line no-console
		}

		this._audiocontrol.unsetVolumeChangeListener();
		this._avplayCallbackActive = false;
		this._playbackRate = 1;
		this._url = null;

		clearInterval(this._aplayStateInterval);
		document.body.removeChild(this._videoObject);

		this._stateMachine.setState(DESTROYED);
	}

	/**
	 * @override
	 */
	getDuration() {
		const isLive = this._avplay.getStreamingProperty('IS_LIVE') === '1';

		return isLive ? Infinity : this._avplay.getDuration();
	}

	/**
	 * @override
	 */
	getVolume() {
		return this._audiocontrol.getVolume();
	}

	/**
	 * @override
	 */
	setVolume(volume) {
		const normalized = Math.min(100, Math.max(0, volume));

		if (this._audiocontrol.getVolume() === normalized) {
			return;
		}

		this._fireEvent(this.EVENT_WILL_CHANGE_VOLUME, normalized);
		this._audiocontrol.setVolume(normalized);
	}

	/**
	 * @override
	 */
	volumeUp(step) {
		if (step === undefined) {
			this._audiocontrol.setVolumeUp();
			return this._audiocontrol.getVolume();
		}
		return super.volumeUp(step);
	}

	/**
	 * @override
	 */
	volumeDown(step) {
		if (step === undefined) {
			this._audiocontrol.setVolumeDown();
			return this._audiocontrol.getVolume();
		}
		return super.volumeDown(step);
	}

	/**
	 * @override
	 */
	getMuted() {
		return this._audiocontrol.isMute();
	}

	/**
	 * @override
	 */
	setMuted(muted) {
		this._audiocontrol.setMute(muted);
	}

	/**
	 * @override
	 */
	getPlaybackRate() {
		return this._playbackRate;
	}

	/**
	 * @override
	 */
	setPlaybackRate(rate) {
		this._fireEvent(this.EVENT_WILL_CHANGE_RATE, rate);
		this._playbackRate = rate;
		this._failToErrorState(() => this._avplay.setSpeed(rate));
		this._fireEvent(this.EVENT_RATE_CHANGE, rate);
	}

	/**
	 * @override
	 */
	getUrl() {
		return /** @type {string} */ (this._url);
	}

	/**
	 * @override
	 */
	getViewport() {
		return this._viewport;
	}

	/**
	 * @override
	 */
	attachDRM(client) {
		let hook;
		switch (client.type) {
			case DRMType.PLAYREADY:
				hook = new PlayReadyHook(/** @type {PlayReadyClient} */ (client));
				break;
			case DRMType.VERIMATRIX:
				hook = new VerimatrixHook(/** @type {VerimatrixClient} */ (client));
				break;
			default:
				throw new UnsupportedFeature(`${client.type} DRM`);
		}

		if (hook) {
			this._drmHooks.set(client.type, hook);
			hook.on(hook.EVENT_ERROR, this._onDRMErrorBound);
		}
	}

	/**
	 * @override
	 */
	detachDRM(type) {
		const hook = this._drmHooks.get(type);
		if (hook) {
			hook.off(hook.EVENT_ERROR, this._onDRMErrorBound);
			hook.destroy();
			this._drmHooks.delete(type);
		}

		return Promise.resolve();
	}

	/**
	 * @param {Error} error
	 * @protected
	 */
	_onDRMError(error) {
		this._onError(error);
	}

	/**
	 * @protected
	 */
	_init() {
		this._avplay.setListener(this._createAVPlayListener());
		this._avplayCallbackActive = true;

		this._videoObject = /** @type {HTMLObjectElement} */ (document.createElement('object'));

		this._videoObject.setAttribute('id', 'av-player');
		this._videoObject.setAttribute('type', 'application/avplayer');
		this._videoObject.style.position = 'absolute';

		document.body.insertBefore(this._videoObject, document.body.firstChild);

		this._avplayState = this._avplay.getState();
		this._aplayStateInterval = setInterval(() => this._checkAVPlayStateChange(), STATE_MONITORING_INTERVAL);

		this._stateMachine.on(this._stateMachine.EVENT_STATE_ENTER, this._manageScreenSaverBound);

		this._audiocontrol.setVolumeChangeListener((volume) => this._onVolumeChanged(volume));

		this._viewport = new ViewPort(
			this._avplay,
			this._videoObject,
			this._panelResolution,
			this._appResolution,
			this._version
		);
	}

	/**
	 * @return {AVPlay.AVPlayPlaybackCallback}
	 * @protected
	 */
	_createAVPlayListener() {
		const handlers = {
			onbufferingstart: this._onAVPlayBufferingStart,
			onbufferingcomplete: this._onAVPlayBufferingComplete,
			oncurrentplaytime: this._onAVPlayCurrentTime,
			onstreamcompleted: this._onAVPlayStreamCompleted,
			ondrmevent: this._onDRMEvent,
			onerror: (errorText) => this._onError(new Error(errorText))
		};

		const otherEvents = [
			'onevent',
			'onsubtitlechange',
			// Undocumented:
			'onhttperrorevent',
			'onuserdata'
		];

		for (const [key, handler] of Object.entries(handlers)) {
			handlers[key] = (...params) => {
				if (this._avplayCallbackActive) {
					handler.apply(this, params);
				} else {
					this._fireEvent(this.EVENT_DEBUG_MESSAGE, `avplay ${key} but callback is not active`);
				}
			};
		}

		for (const event of otherEvents) {
			handlers[event] = (...args) => {
				this._fireEvent(this.EVENT_DEBUG_MESSAGE, `avplay ${event}`, args.map(String).join(', '));
			};
		}

		return handlers;
	}

	/**
	 * @protected
	 */
	_onPreparedCallback() {
		this._fireEvent(this.EVENT_DEBUG_MESSAGE, 'prepareAsync callback');
		this._isReady.prepareCallback = true;
		this._onMaybeReady();

		// This callback means something just changed in avplay, we should update its state
		// Particularly, we can miss avplay READY state if we start playback right now
		// before state monitoring interval detects it
		this._checkAVPlayStateChange();
	}

	/**
	 * @protected
	 */
	_onSeekCompletedCallback() {
		this._fireEvent(this.EVENT_SEEKED, this.getPosition());

		if (this._stateBeforeSeeking === ENDED) {
			// AVPlay is still in state PLAYING since we never called stop
			this._stateMachine.setState(PLAYING);
			this._failToErrorState(() => this._avplay.play());
		} else if (this._stateBeforeSeeking) {
			this._stateMachine.setState(this._stateBeforeSeeking);
		}

		this._stateBeforeSeeking = null;
		this._checkAVPlayStateChange();
	}

	/**
	 * @protected
	 */
	_onAVPlayBufferingStart() {
		this._fireEvent(this.EVENT_DEBUG_MESSAGE, 'avplay bufferingstart');
		if (this._stateMachine.isIn(LOADING)) {
			this._isReady.bufferingComplete = false;
			return;
		}

		if (this._stateMachine.isIn(SEEKING)) {
			return;
		}

		const avplayState = this._avplay.getState();

		// This appears to be some speculative caching that AVPlay does when not actually doing anything
		// It's safe to ignore since buffering only matters for us only in LOADING and PLAYING
		if ([READY, IDLE, PAUSED].includes(avplayState)) {
			return;
		}

		// Now this is just a mystery, what the hell is it even buffering when no media source is known?
		if (avplayState === AVPlayPlayerState.NONE) {
			return;
		}

		// When playing with playback rates other than 1 it sometimes reports duplicate buffering starts
		if (this._stateMachine.isIn(WAITING)) {
			return;
		}

		this._stateBeforeWaiting = this._stateMachine.getCurrentState();
		this._stateMachine.setState(WAITING);
	}

	/**
	 * @protected
	 */
	_onAVPlayBufferingComplete() {
		this._fireEvent(this.EVENT_DEBUG_MESSAGE, 'avplay bufferingcomplete');
		if (this._stateMachine.isIn(LOADING)) {
			this._isReady.bufferingComplete = true;
			this._onMaybeReady();
			return;
		}

		if (this._stateMachine.isIn(SEEKING)) {
			return;
		}

		const avplayState = this._avplay.getState();
		if (avplayState === AVPlayPlayerState.IDLE || avplayState === AVPlayPlayerState.PAUSED) {
			return;
		}

		if (avplayState === AVPlayPlayerState.NONE) {
			return;
		}

		if (this._stateMachine.isIn(WAITING) && this._stateBeforeWaiting) {
			this._stateMachine.setState(this._stateBeforeWaiting);
			this._stateBeforeWaiting = null;
		}
	}

	/**
	 * @param {number} currentTime
	 * @protected
	 */
	_onAVPlayCurrentTime(currentTime) {
		if (this._stateMachine.isIn(PLAYING) && !this._stateMachine.getPendingTransition()) {
			this._fireEvent(this.EVENT_TIME_UPDATE, currentTime);
		}
	}

	/**
	 * @protected
	 */
	_onAVPlayStreamCompleted() {
		// AVPlay will state in PLAYING state here until we call stop()
		// Since ENDED is supposed to keep media file loaded, we're not going to do that here, but in methods that
		// transit from ENDED (setPosition)

		this._stateMachine.setState(ENDED);
		this._checkAVPlayStateChange();
	}

	/**
	 * @protected
	 */
	_checkAVPlayStateChange() {
		const newState = this._avplay.getState();
		const oldState = this._avplayState;

		if (newState !== oldState) {
			this._avplayState = newState;
			this._onAVPlayStateChangeDetected(newState);
		}
	}

	/**
	 * @param {string} newState
	 * @protected
	 */
	_onAVPlayStateChangeDetected(newState) {
		this._fireEvent(this.EVENT_DEBUG_MESSAGE, 'avplay state change detected', newState);
		const pendingTransition = this._stateMachine.getPendingTransition();

		switch (newState) {
			case AVPlayPlayerState.READY:
				this._isReady.readyState = true;
				this._onMaybeReady();
				break;
			case AVPlayPlayerState.PLAYING:
				this._stateMachine.setState(PLAYING);
				break;
			case AVPlayPlayerState.PAUSED:
				this._stateMachine.setState(PAUSED);
				break;
			case AVPlayPlayerState.IDLE:
				// Since we typically call AVPlay.close() along with AVPlay.stop() we skip IDLE state straight to NONE
				// States when we call avplay.stop() without close() are handled in appropriate methods

				if (
					pendingTransition &&
					pendingTransition.from === LOADING &&
					pendingTransition.to === IDLE
				) {
					this._stateMachine.setState(IDLE);
				}

				break;
			case AVPlayPlayerState.NONE:
				// AVPlay NONE state could be either IDLE or DESTROYED in StatefulVideo model
				// DESTROYED is set synchronously in destroy() method because of it's nature.
				if (this._stateMachine.isNotIn(IDLE) && this._stateMachine.isNotIn(DESTROYED)) {
					this._stateMachine.setState(IDLE);
				}

				break;
		}
	}

	/**
	 * @param {AVPlayDrmType} avplayDrmType
	 * @param {Object} data
	 * @protected
	 */
	_onDRMEvent(avplayDrmType, data) {
		this._fireEvent(this.EVENT_DEBUG_MESSAGE, 'drmevent', avplayDrmType + ' ' + JSON.stringify(data));
		const drmType = {
			[AVPlayDrmType.PLAY_READY]: DRMType.PLAYREADY,
			[AVPlayDrmType.VERIMATRIX]: DRMType.VERIMATRIX
		}[avplayDrmType];


		const hook = this._drmHooks.get(drmType);

		if (hook) {
			hook.onAVPlayEvent(data);
		}
	}

	/**
	 * @protected
	 */
	_onMaybeReady() {
		const {prepareCallback, readyState, bufferingComplete} = this._isReady;

		if (prepareCallback && readyState && bufferingComplete) {
			this._onActuallyReady();
		}
	}

	/**
	 * @protected
	 */
	_onActuallyReady() {
		// A lot of problems are observed with viewport on Tizen, so just in case
		this._viewport.updateViewPort();
		this._stateMachine.setState(READY);
	}

	/**
	 * @param {number} volume
	 * @protected
	 */
	_onVolumeChanged(volume) {
		this._fireEvent(this.EVENT_VOLUME_CHANGE, volume);
	}

	/**
	 * @protected
	 */
	_clearReady() {
		this._isReady = {
			prepareCallback: false,
			readyState: false,
			bufferingComplete: true
		};
	}

	/**
	 * @template RETURN_TYPE
	 * @param {function(): RETURN_TYPE} func
	 * @return {RETURN_TYPE}
	 * @protected
	 */
	_failToErrorState(func) {
		try {
			return func();
		} catch (error) {
			this._onError(error);
			throw error;
		}
	}

	/**
	 * @param {WebAPIError|Error} error
	 * @protected
	 */
	_onError(error) {
		this._stateMachine.abortPendingTransition();

		const message = [
			error.name,
			error.code,
			error.message
		].filter((property) => property !== undefined).join(' ');

		if (this._stateMachine.isIn(DESTROYED)) {
			this._fireEvent(this.EVENT_DEBUG_MESSAGE, `Error happened in destroyed state: ${message}`);
		} else {
			if (!this._stateMachine.isIn(ERROR)) {
				// In case a second consecutive error happened
				this._stateMachine.setState(ERROR);
			}
			this._fireEvent(this.EVENT_ERROR, message);
		}
	}

	/**
	 * @param {State} state
	 * @protected
	 */
	_manageScreenSaver(state) {
		const disabledStates = [LOADING, WAITING, PLAYING, SEEKING];
		const screenSaverState = disabledStates.includes(state) ?
			window.webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF :
			window.webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON;

		if (this._cachedScreenSaverState === screenSaverState) {
			return;
		}
		this._cachedScreenSaverState = screenSaverState;

		window.webapis.appcommon.setScreenSaver(
			screenSaverState,
			() => {
				this._fireEvent(this.EVENT_DEBUG_MESSAGE, `ScreenSaver state changed to ${screenSaverState}`);
			},
			(error) => {
				console.error('Error changing screenSaver state', error); // eslint-disable-line no-console
				this._fireEvent(this.EVENT_DEBUG_MESSAGE, `Failed to change screenSaver state: ${error}`);
			}
		);
	}

	/**
	 * @override
	 */
	static isDRMSupported(type) {
		return [
			DRMType.PLAYREADY,
			DRMType.VERIMATRIX
		].includes(type);
	}

	/**
	 * @override
	 */
	static canHandleMultiDRM() {
		return true;
	}
}


/**
 * @const {number}
 */
const STATE_MONITORING_INTERVAL = 100;

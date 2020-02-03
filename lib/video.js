/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2015-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {State} from 'zb/device/interfaces/i-video';
import * as console from 'zb/console/console';
import AbstractVideo from 'zb/device/abstract-video';
import Rect from 'zb/geometry/rect';
import {ResolutionInfo} from 'zb/device/resolutions';
import IInfo from 'zb/device/interfaces/i-info';
import UnsupportedFeature from 'zb/device/errors/unsupported-feature';
import TaskManager, {TaskType, TaskCreator} from './task-manager';
import {AVPlayPlayerState} from './consts/avplay';
import ViewPort from './view-port';


/**
 */
export default class Video extends AbstractVideo {
	/**
	 * @param {Rect} rect
	 * @param {IInfo} info
	 */
	constructor(rect, info) {
		super(rect);

		/**
		 * @type {AVPlay}
		 * @protected
		 */
		this._plugin;

		/**
		 * @type {ViewPort}
		 * @protected
		 */
		this._viewport;

		/**
		 * @type {IInfo}
		 * @protected
		 */
		this._info = info;

		/**
		 * @type {HTMLObjectElement}
		 * @protected
		 */
		this._videoObject;

		/**
		 * This flag aimed to prevent redundant EVENT_TIME_UPDATE firing and
		 * returning of invalid current position (always 0) after playback is ended
		 * @type {boolean}
		 * @protected
		 */
		this._isPlaybackEnded = false;

		/**
		 * @type {TaskManager}
		 * @protected
		 */
		this._taskManager = new TaskManager();

		/**
		 * @type {string}
		 * @private
		 */
		this._url = '';

		/**
		 * This event indicates that the avplay plugin is open and can be configured
		 * with setStreamingProperty/setDrm
		 * Fired with: nothing
		 * @const {string}
		 */
		this.EVENT_PLUGIN_OPEN = 'plugin-open';

		/**
		 * This event indicates that the avplay plugin is closed and a configuration can be reset
		 * Fired with: nothing
		 * @const {string}
		 */
		this.EVENT_PLUGIN_CLOSE = 'plugin-close';

		this._initPlugin();
		this._initVideoObject();
		this._initViewPort();

		this._onError = this._onError.bind(this);
		this._onEvent = this._onEvent.bind(this);
		this._onBufferingStart = this._onBufferingStart.bind(this);
		this._onCurrentPlayTime = this._onCurrentPlayTime.bind(this);
		this._onStreamCompleted = this._onStreamCompleted.bind(this);
		this._onVisibilityChanged = this._onVisibilityChanged.bind(this);

		this._setProxyingPluginListener();
		this._subscribeVisibilityChange();
		this._subscribeDefaultPlaybackListeners();

		window.tizen.tvaudiocontrol.setVolumeChangeListener(this._onVolumeChange.bind(this));
	}

	/**
	 * @override
	 */
	resume() {
		if (this._state === State.PAUSED) {
			this._play();
		}
	}

	/**
	 * @override
	 */
	pause() {
		this._plugin.pause();
		this._setState(State.PAUSED);
		this._fireEvent(this.EVENT_PAUSE);
	}

	/**
	 * @override
	 */
	stop() {
		this._taskManager.addTask(
			this._createStopTask(),
			TaskType.STOP
		);
	}

	/**
	 * @override
	 */
	play(url, position) {
		this._taskManager.addTask(
			this._createPlayTask(url, position),
			TaskType.PLAY
		);
	}

	/**
	 * @override
	 */
	setPosition(position) {
		const stateBeforeSeek = this.getState();
		const currentPosition = this.getPosition();
		const normalizedPosition = Math.min(position, this._plugin.getDuration() - 1);
		const diff = normalizedPosition - currentPosition;

		const jump = this._plugin[diff > 0 ? 'jumpForward' : 'jumpBackward'].bind(this._plugin);

		if (this.getState() === State.SEEKING) {
			this._fireEvent(this.EVENT_TIME_UPDATE, currentPosition);
		}

		this._setState(State.SEEKING);

		// Workaround for quick apply position
		this._plugin.pause();

		jump(Math.abs(diff), () => {
			if (stateBeforeSeek === State.PAUSED) {
				this._setState(State.PAUSED);
				this._fireEvent(this.EVENT_PAUSE);
			} else if (
				stateBeforeSeek === State.PLAYING ||
				stateBeforeSeek === State.BUFFERING ||
				stateBeforeSeek === State.SEEKING
			) {
				this._play();
			}
		});
	}

	/**
	 * @override
	 */
	getPosition() {
		return this._isPlaybackEnded ?
			this.getDuration() :
			this._plugin.getCurrentTime();
	}

	/**
	 * @override
	 */
	getDuration() {
		return this._plugin.getDuration();
	}

	/**
	 * @override
	 */
	getUrl() {
		return this._url;
	}

	/**
	 * @override
	 */
	destroy() {
		this.stop();

		this._url = '';
		this._deinitVideoObject();

		this._unsubscribeVisibilityChange();
		this._unsubscribeDefaultPlaybackListeners();

		window.tizen.tvaudiocontrol.unsetVolumeChangeListener();

		this._setState(State.DEINITED);
	}

	/**
	 * @override
	 */
	forward() {
		throw new UnsupportedFeature('Forward');
	}

	/**
	 * @override
	 */
	rewind() {
		throw new UnsupportedFeature('Rewind');
	}

	/**
	 * @override
	 */
	setPlaybackRate(rate) {
		throw new UnsupportedFeature('Playback rate change');
	}

	/**
	 * @override
	 */
	getPlaybackRate() {
		throw new UnsupportedFeature('Playback rate getting');
	}

	/**
	 * @override
	 */
	getMuted() {
		return window.tizen.tvaudiocontrol.isMute();
	}

	/**
	 * @override
	 */
	setMuted(muted) {
		window.tizen.tvaudiocontrol.setMute(muted);
	}

	/**
	 * @override
	 */
	setVolume(value) {
		window.tizen.tvaudiocontrol.setVolume(Math.min(100, Math.max(0, value)));
	}

	/**
	 * @override
	 */
	getVolume() {
		return window.tizen.tvaudiocontrol.getVolume();
	}

	/**
	 * @return {TaskCreator}
	 * @protected
	 */
	_createStopTask() {
		return () => new Promise((resolve, reject) => {
			try {
				this._stop();
				resolve();
			} catch (error) {
				this._onError('STOP_ERROR', error);
				reject(error);
			}
		});
	}

	/**
	 * @param {string} url
	 * @param {number=} position
	 * @return {TaskCreator}
	 * @protected
	 */
	_createPlayTask(url, position) {
		return () => new Promise((resolve, reject) => {
			const play = () => {
				try {
					this._play();
					resolve();
				} catch (e) {
					reject();
				}
			};

			let wasHiddenBeforePrepared = false;
			const onVisibilityChangedDuringPreparation = () => {
				wasHiddenBeforePrepared = true;
			};

			const onPreparationDone = () => {
				// Repeat the preparation when the application was hidden during the last one
				// because it may lead to an error-prone playback or a lack of events
				if (wasHiddenBeforePrepared) {
					wasHiddenBeforePrepared = false;

					this._close();
					this._open(url);

					this._asyncPrepare()
						.then(onPreparationDone, onPreparationFailed);

					return;
				}

				document.removeEventListener('visibilitychange', onVisibilityChangedDuringPreparation);

				this._fireEvent(this.EVENT_LOADED_META_DATA);
				this._fireEvent(this.EVENT_DURATION_CHANGE, this.getDuration());

				this._viewport.updateViewPort();

				play();
			};

			const onPreparationFailed = () => {
				document.removeEventListener('visibilitychange', onVisibilityChangedDuringPreparation);

				reject();
			};

			this._url = url;
			this._isPlaybackEnded = false;

			this._open(url);
			this._setState(State.LOADING);
			this._fireEvent(this.EVENT_LOAD_START);

			document.addEventListener('visibilitychange', onVisibilityChangedDuringPreparation);

			if (position) {
				this._seekTo(position)
					.then(() => this._asyncPrepare())
					.then(onPreparationDone, onPreparationFailed);
			} else {
				this._asyncPrepare()
					.then(onPreparationDone, onPreparationFailed);
			}
		});
	}

	/**
	 * @return {TaskCreator}
	 * @protected
	 */
	_createSuspendTask() {
		return () => new Promise((resolve) => {
			this._plugin.suspend();

			const onVisibilityChanged = () => {
				document.removeEventListener('visibilitychange', onVisibilityChanged);

				this._plugin.restore();

				// Suspense resets the viewport so we have to do force update here
				this._viewport.updateViewPort();

				resolve();
			};

			document.addEventListener('visibilitychange', onVisibilityChanged);
		});
	}

	/**
	 * @param {string} url
	 * @protected
	 */
	_open(url) {
		this._plugin.open(url);
		this._fireEvent(this.EVENT_PLUGIN_OPEN);
	}

	/**
	 * @protected
	 */
	_close() {
		this._plugin.close();
		this._fireEvent(this.EVENT_PLUGIN_CLOSE);
	}

	/**
	 * @param {number} position ms
	 * @return {Promise}
	 * @protected
	 */
	_seekTo(position) {
		return new Promise((resolve, reject) => {
			if (this._plugin.getState() === AVPlayPlayerState.IDLE) {
				this._plugin.seekTo(position);
				resolve();
			} else {
				this._plugin.seekTo(position, resolve, reject);
			}
		});
	}

	/**
	 * @return {Promise}
	 * @protected
	 */
	_asyncPrepare() {
		return new Promise((resolve, reject) => {
			const stateMonitoringIntervalId = setInterval(() => {
				// Under certain conditions passed to the prepareAsync listeners may be never called
				// but at the same time the state will be set to NONE, so handle this case by a continuous monitoring
				if (this._plugin.getState() === AVPlayPlayerState.NONE) {
					releaseAndReject();
				}
			}, STATE_MONITORING_INTERVAL);

			const release = () => {
				clearInterval(stateMonitoringIntervalId);
				this.off(AVPlayPlaybackCallback.ON_ERROR, releaseAndReject);
			};

			const releaseAndResolve = () => {
				release();
				resolve();
			};

			const releaseAndReject = () => {
				release();
				reject();
			};

			const onPreparationError = (error) => {
				this._onError('PREPARATION_ERROR', error);
				releaseAndReject();
			};

			this.once(AVPlayPlaybackCallback.ON_ERROR, releaseAndReject);

			try {
				this._plugin.prepareAsync(releaseAndResolve, onPreparationError);
			} catch (error) {
				onPreparationError(error);
			}
		});
	}

	/**
	 * @protected
	 */
	_play() {
		this._plugin.play();
		this._setState(State.PLAYING);
		this._fireEvent(this.EVENT_PLAY);
	}

	/**
	 * @protected
	 */
	_stop() {
		this._plugin.stop();
		this._close();

		this._setState(State.STOPPED);
		this._fireEvent(this.EVENT_STOP);
	}

	/**
	 * @return {ViewPort}
	 * @protected
	 */
	_createViewPort() {
		return new ViewPort(
			this._plugin,
			this._videoObject,
			ResolutionInfo[this._info.getPanelResolution()],
			ResolutionInfo[this._info.getOSDResolution()],
			this._info.version()
		);
	}

	/**
	 * @protected
	 */
	_initPlugin() {
		this._plugin = /** @type {AVPlay} */ (window.webapis.avplay);
	}

	/**
	 * @protected
	 */
	_initVideoObject() {
		this._videoObject = /** @type {HTMLObjectElement} */ (document.createElement('object'));

		this._videoObject.setAttribute('id', 'av-player');
		this._videoObject.setAttribute('type', 'application/avplayer');
		this._videoObject.style.position = 'absolute';

		document.body.insertBefore(this._videoObject, document.body.firstChild);
	}

	/**
	 * @protected
	 */
	_deinitVideoObject() {
		document.body.removeChild(this._videoObject);
	}

	/**
	 * @return {function()}
	 * @protected
	 */
	_createStateSnapshot() {
		const stateBefore = this.getState();

		return () => {
			if (stateBefore === State.PAUSED) {
				this._setState(State.PAUSED);
				this._fireEvent(this.EVENT_PAUSE);
			} else if (stateBefore === State.PLAYING) {
				this._setState(State.PLAYING);
				this._fireEvent(this.EVENT_PLAY);
			}
		};
	}

	/**
	 * @protected
	 */
	_setProxyingPluginListener() {
		const listener = {};

		Object.keys(AVPlayPlaybackCallback)
			.forEach((key) => {
				const eventName = AVPlayPlaybackCallback[key];
				listener[eventName] = (...args) => {
					this._fireEvent(...[eventName].concat(args));
				};
			});

		this._plugin.setListener(listener);
	}

	/**
	 * @protected
	 */
	_subscribeDefaultPlaybackListeners() {
		this.on(AVPlayPlaybackCallback.ON_BUFFERING_START, this._onBufferingStart);
		this.on(AVPlayPlaybackCallback.ON_STREAM_COMPLETED, this._onStreamCompleted);
		this.on(AVPlayPlaybackCallback.ON_CURRENT_PLAY_TIME, this._onCurrentPlayTime);
		this.on(AVPlayPlaybackCallback.ON_EVENT, this._onEvent);
		this.on(AVPlayPlaybackCallback.ON_ERROR, this._onError);
	}

	/**
	 * @protected
	 */
	_unsubscribeDefaultPlaybackListeners() {
		this.off(AVPlayPlaybackCallback.ON_BUFFERING_START, this._onBufferingStart);
		this.off(AVPlayPlaybackCallback.ON_STREAM_COMPLETED, this._onStreamCompleted);
		this.off(AVPlayPlaybackCallback.ON_CURRENT_PLAY_TIME, this._onCurrentPlayTime);
		this.off(AVPlayPlaybackCallback.ON_EVENT, this._onEvent);
		this.off(AVPlayPlaybackCallback.ON_ERROR, this._onError);
	}

	/**
	 * @protected
	 */
	_subscribeVisibilityChange() {
		document.addEventListener('visibilitychange', this._onVisibilityChanged);
	}

	/**
	 * @protected
	 */
	_unsubscribeVisibilityChange() {
		document.removeEventListener('visibilitychange', this._onVisibilityChanged);
	}

	/**
	 * @protected
	 */
	_onVisibilityChanged() {
		if (document.hidden) {
			this._onApplicationHidden();
		}
	}

	/**
	 * @param {number} volume
	 * @protected
	 */
	_onVolumeChange(volume) {
		this._fireEvent(this.EVENT_VOLUME_CHANGE, volume);
	}

	/**
	 * @protected
	 */
	_onApplicationHidden() {
		const currentPluginState = this._plugin.getState();
		const isCurrentStateCanBeSuspended = (
			currentPluginState === AVPlayPlayerState.PLAYING ||
			currentPluginState === AVPlayPlayerState.PAUSED
		);

		if (isCurrentStateCanBeSuspended && !this._isPlaybackEnded) {
			this._taskManager.addTask(this._createSuspendTask(), TaskType.SUSPEND);
		}
	}

	/**
	 * @protected
	 */
	_onBufferingStart() {
		const stateSnapshot = this._createStateSnapshot();

		this._setState(State.BUFFERING);
		this._fireEvent(this.EVENT_BUFFERING);

		this.once(AVPlayPlaybackCallback.ON_BUFFERING_IN_COMPLETE, stateSnapshot);
	}

	/**
	 * @param {string} eventType
	 * @param {string} currentPlayTime
	 * @protected
	 */
	_onCurrentPlayTime(eventType, currentPlayTime) {
		const currentPT = parseInt(currentPlayTime, 10);

		if (isNaN(currentPT)) {
			return;
		}

		if (currentPT) {
			this._fireEvent(this.EVENT_TIME_UPDATE, currentPT);
		}
	}

	/**
	 * @protected
	 */
	_onStreamCompleted() {
		if (this._isPlaybackEnded) {
			return;
		}

		this._isPlaybackEnded = true;
		this._fireEvent(this.EVENT_ENDED);
	}

	/**
	 * @param {string} eventType
	 * @param {*} error
	 * @protected
	 */
	_onError(eventType, error) {
		// Stop playback when error is not terminal, e.g. PLAYER_ERROR_CONNECTION_FAILED
		if (this._plugin.getState() !== AVPlayPlayerState.IDLE) {
			this._plugin.stop();
		}

		this._close();

		console.error('tizen-error::', error + '');

		this._setState(State.ERROR);
		this._fireEvent(this.EVENT_ERROR, error + '');
	}

	/**
	 * @param {string} eventType
	 * @param {*} eventData
	 * @protected
	 */
	_onEvent(eventType, eventData) {
		console.info('tizen-event::eventType', eventType, 'eventData', eventData);
	}
}


/**
 * @const {number}
 */
const STATE_MONITORING_INTERVAL = 200;


/**
 * @enum {string}
 */
export const AVPlayPlaybackCallback = {
	ON_BUFFERING_START: 'onbufferingstart',
	ON_BUFFERING_IN_PROGRESS: 'onbufferingprogress',
	ON_BUFFERING_IN_COMPLETE: 'onbufferingcomplete',
	ON_CURRENT_PLAY_TIME: 'oncurrentplaytime',
	ON_STREAM_COMPLETED: 'onstreamcompleted',
	ON_EVENT: 'onevent',
	ON_ERROR: 'onerror',
	ON_DRM_EVENT: 'ondrmevent',
	ON_SUBTITLE_CHANGE: 'onsubtitlechange'
};

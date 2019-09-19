/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2015-2019, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {State} from 'zb/device/interfaces/i-video';
import {error, warn} from 'zb/console/console';
import Rect from 'zb/geometry/rect';
import AbstractDevice from 'zb/device/abstract-device';
import UnsupportedFeature from 'zb/device/errors/unsupported-feature';
import LocalStorage from 'zb/device/common/local-storage';
import Info from './info';
import Input from './input';
import MSFServer from './msf-server';
import Video from './video';


/**
 */
export default class Device extends AbstractDevice {
	/**
	 */
	constructor() {
		super();

		/**
		 * @type {Input}
		 */
		this.input;

		/**
		 * @type {Info}
		 */
		this.info;

		/**
		 * @type {LocalStorage}
		 */
		this.storage;

		/**
		 * @type {MSFServer}
		 * @protected
		 */
		this._msfServer;

		/**
		 * @type {?Promise}
		 * @protected
		 */
		this._screensaverJob = null;

		/**
		 * @type {Tizen}
		 * @protected
		 */
		this._tizen = /** @type {Tizen} */ (window.tizen);

		/**
		 * @type {Webapis}
		 * @protected
		 */
		this._webapis = /** @type {Webapis} */ (window.webapis);

		/**
		 * Fired with: {Object}
		 * @const {string}
		 */
		this.EVENT_APP_CONTROL = 'tizen-app-control';
	}

	/**
	 * @override
	 */
	init() {
		this.info = new Info(this._tizen);
		this.input = new Input();
		this.storage = new LocalStorage();

		window.addEventListener('appcontrol', this._onAppControl.bind(this));

		this.info
			.init()
			.then(this._fireEvent.bind(this, this.EVENT_READY));
	}

	/**
	 * @override
	 * @param {Rect} rect
	 * @return {Video}
	 */
	createVideo(rect) {
		const video = new Video(rect, this.info);
		video.on(video.EVENT_STATE_CHANGE, this._updateScreensaverState.bind(this));

		return video;
	}

	/**
	 * @override
	 */
	getMAC() {
		return (
			this.info.getProperty('ETHERNET_NETWORK')['macAddress'] ||
			this.info.getProperty('WIFI_NETWORK')['macAddress'] ||
			''
		);
	}

	/**
	 * @override
	 */
	getIP() {
		return (
			this.info.getProperty('ETHERNET_NETWORK')['ipAddress'] ||
			this.info.getProperty('WIFI_NETWORK')['ipAddress'] ||
			''
		);
	}

	/**
	 * @override
	 */
	exit() {
		this._tizen.application.getCurrentApplication().exit();
	}

	/**
	 * @override
	 */
	setOSDOpacity() {
		throw new UnsupportedFeature('OSD opacity setting');
	}

	/**
	 * @override
	 */
	getOSDOpacity() {
		throw new UnsupportedFeature('OSD opacity getting');
	}

	/**
	 * @override
	 */
	setOSDChromaKey(chromaKey) {
		throw new UnsupportedFeature('OSD chroma key setting');
	}

	/**
	 * @override
	 */
	getOSDChromaKey() {
		throw new UnsupportedFeature('OSD chroma key getting');
	}

	/**
	 * @override
	 */
	removeOSDChromaKey() {
		throw new UnsupportedFeature('OSD chroma key removing');
	}

	/**
	 * @override
	 */
	hasOSDOpacityFeature() {
		return false;
	}

	/**
	 * @override
	 */
	hasOSDAlphaBlendingFeature() {
		return true;
	}

	/**
	 * @override
	 */
	hasOSDChromaKeyFeature() {
		return false;
	}

	/**
	 * @override
	 */
	isUHDSupported() {
		return this._webapis.productinfo.isUdPanelSupported();
	}

	/**
	 * @override
	 */
	getEnvironment() {
		throw new UnsupportedFeature('Environment getting');
	}

	/**
	 * @override
	 */
	getLaunchParams() {
		const requestedAppControl = this._tizen.application.getCurrentApplication().getRequestedAppControl();
		if (!requestedAppControl) {
			return {};
		}

		const data = requestedAppControl.appControl.data;

		const payload = data.find((item) => item['key'] === 'PAYLOAD');
		if (!payload) {
			return {};
		}

		const params = JSON.parse(payload['value'][0])['values'];
		if (!params) {
			return {};
		}

		try {
			return /** @type {Object} */ (JSON.parse(params));
		} catch (e) {
			if (e instanceof SyntaxError) {
				warn('Error parsing launch params: ' + e.message);
			} else {
				throw e;
			}
		}

		return {};
	}

	/**
	 */
	hide() {
		this._tizen.application.getCurrentApplication().hide();
	}

	/**
	 * @param {Object} context
	 */
	proxyContext(context) {
		/**
		 * @type {Object<string, Object<string, Object>>}
		 */
		const toProxy = {
			'widget': {},

			'tizen': {
				'tvinputdevice': {
					'wrappers': [
						'registerKey'
					]
				},

				'systeminfo': {
					'wrappers': [
						'getCapabilities'
					],
					'deferred': [
						'getPropertyValue'
					]
				},

				'tvaudiocontrol': {
					'listeners': [
						'setVolumeChangeListener',
						'setAudioOutputChangeListener'
					],
					'properties': [
						'outputs',
						'activeOutput'
					],
					'wrappers': [
						'hasAudioFocus',
						'setMute',
						'isMute',
						'setVolume',
						'setVolumeUp',
						'setVolumeDown',
						'getVolume',
						'getOutputMode',
						'playSound',
						'audiooutputchanged',
						'unsetVolumeChangeListener',
						'unsetAudioOutputChangeListener'
					]
				}
			},

			'webapis': {
				'network': {
					'wrappers': [
						'getMac',
						'getIp'
					]
				},

				'productinfo': {
					'wrappers': [
						'getFirmware',
						'isUdPanelSupported'
					]
				},

				'avplay': {
					'listeners': [
						'setListener'
					],
					'deferred': [
						'prepareAsync',
						'seekTo',
						'stop',
						'jumpForward',
						'jumpBackward'
					],
					'wrappers': [
						'open',
						'close',
						'prepare',
						'setDisplayRect',
						'play',
						'stop',
						'getState',
						'pause',
						'jumpForward',
						'jumpBackward',
						'getDuration',
						'getCurrentTime',
						'setSpeed',
						'setTimeoutForBuffering',
						'setSoundAnalysisListener',
						'unsetSoundAnalysisListener',
						'setSilentSubtitle',
						'setExternalSubtitlePath',
						'setSubtitlePosition',
						'setDisplayMethod',
						'setSelectTrack',
						'getCurrentStreamInfo',
						'getTotalTrackInfo',
						'setStreamingProperty',
						'getStreamingProperty',
						'getVersion',
						'suspend',
						'restore',
						'onbufferingstart',
						'onbufferingprogress',
						'onbufferingcomplete',
						'oncurrentplaytime',
						'onstreamcompleted',
						'onevent',
						'onerror',
						'ondrmevent',
						'onsubtitlechange',
						'ongetexception',
						'onsetexception',
						'ongetbandsarray'
					]
				}
			}
		};

		for (const namespace in toProxy) {
			if (toProxy.hasOwnProperty(namespace)) {
				const objects = toProxy[namespace];

				context[namespace] = {};
				for (const key in window[namespace]) {
					if (window[namespace].hasOwnProperty(key)) {
						if (!(key in objects)) {
							context[namespace][key] = window[namespace][key];
						}
					}
				}

				for (const objectName in objects) {
					if (objects.hasOwnProperty(objectName)) {
						context[namespace][objectName] = {};

						(objects[objectName]['properties'] || []).forEach((propertyName) => {
							context[namespace][objectName][propertyName] = window[namespace][objectName][propertyName];
						});

						(objects[objectName]['wrappers'] || []).forEach((methodName) => {
							((() => {
								const localNamespace = namespace;
								const localObjectName = objectName;
								const localMethodName = methodName;

								context[localNamespace][localObjectName][localMethodName] = (...args) =>
									window[localNamespace][localObjectName][localMethodName](...args);
							}))();
						});

						(objects[objectName]['deferred'] || []).forEach((methodName) => {
							((() => {
								const localNamespace = namespace;
								const localObjectName = objectName;
								const localMethodName = methodName;

								context[localNamespace][localObjectName][localMethodName] = (...args) => {
									const wrap = (target) => () => {
										setTimeout(() => {
											target(...args);
										}, 0);
									};

									const handledArgs = args.map((arg) => typeof arg === 'function' ? wrap(arg) : arg);

									window[localNamespace][localObjectName][localMethodName](...handledArgs);
								};
							}))();
						});

						(objects[objectName]['listeners'] || []).forEach((methodName) => {
							((() => {
								const localNamespace = namespace;
								const localObjectName = objectName;
								const localMethodName = methodName;

								context[localNamespace][localObjectName][localMethodName] = (listener) => {
									let proxyListener;

									if (typeof listener === 'object') {
										const createProxyListener = (event) => (...args) => {
											setTimeout(() => {
												listener[event](...args);
											}, 0);
										};

										proxyListener = {};
										for (const key in listener) {
											if (listener.hasOwnProperty(key)) {
												proxyListener[key] = createProxyListener(key);
											}
										}
									} else if (typeof listener === 'function') {
										proxyListener = (...args) => {
											listener(...args);
										};
									}

									window[localNamespace][localObjectName][localMethodName](proxyListener);
								};
							}))();
						});
					}
				}
			}
		}
	}

	/**
	 * @param {boolean} turn
	 * @return {Promise<number>}
	 */
	enableScreensaver(turn) {
		const appCommon = this._webapis.appcommon;

		let state;
		if (turn) {
			state = appCommon.AppCommonScreenSaverState.SCREEN_SAVER_ON;
		} else {
			state = appCommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF;
		}

		return new Promise((resolve, reject) => {
			const onError = (err) => {
				error('tizen-error::', err);
				reject(err);
			};
			appCommon.setScreenSaver(state, resolve, onError);
		});
	}

	/**
	 * @param {string} channelName
	 * @return {Promise<MSFServer>}
	 */
	startMultiscreenServer(channelName) {
		// We're assuming application always uses only one channel
		if (this._msfServer) {
			return new Promise((resolve) => resolve(this._msfServer));
		}

		this._msfServer = new MSFServer(this.info.model());

		return this._msfServer.start(channelName)
			.then(() => this._msfServer);
	}

	/**
	 * @param {string} event
	 * @param {State} newState
	 * @protected
	 */
	_updateScreensaverState(event, newState) {
		const resetPromise = () => {
			this._screensaverJob = null;
		};

		const isEnabled = newState !== State.PLAYING;

		this._screensaverJob = (this._screensaverJob || Promise.resolve())
			.then(() => this.enableScreensaver(isEnabled))
			.then(resetPromise, resetPromise);
	}

	/**
	 * @protected
	 */
	_onAppControl() {
		this._fireEvent(this.EVENT_APP_CONTROL, this.getLaunchParams());
	}

	/**
	 * @return {boolean}
	 */
	static detect() {
		return !!(
			window.tizen &&
			window.tizen.systeminfo &&
			window.tizen.systeminfo.getPropertyValue
		);
	}
}

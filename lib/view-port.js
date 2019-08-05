/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2015-2019, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import AbstractViewPort from 'zb/device/abstract-view-port';
import {Resolution, ResolutionInfo} from 'zb/device/resolutions';
import {AspectRatio, Transferring} from 'zb/device/aspect-ratio/aspect-ratio';
import {Common} from 'zb/device/aspect-ratio/proportion';
import Rect from 'zb/geometry/rect';
import {AVPlayDisplayMethod, AVPlayPlayerState} from './consts/avplay';
import {isGTE, isEq, upTo} from './version-utils';

/**
 * Specific method's behaviour on this version:
 * `setDisplayRect` resets DisplayMethod
 * `setDisplayMethod` resets DisplayRect (i.e. set fullscreen implicitly)
 * @const {string}
 */
const IMPLICIT_FULLSCREEN_VERSION = '2.4.0';


/**
 */
export default class ViewPort extends AbstractViewPort {
	/**
	 * @param {Rect} containerRect
	 * @param {AVPlay} plugin
	 * @param {HTMLObjectElement} videoObject
	 * @param {Resolution} osdResolution
	 * @param {string} version
	 */
	constructor(containerRect, plugin, videoObject, osdResolution, version) {
		super(containerRect);

		/**
		 * @type {AVPlay}
		 * @protected
		 */
		this._plugin = plugin;

		/**
		 * @type {HTMLObjectElement}
		 * @protected
		 */
		this._videoObject = videoObject;

		/**
		 * @type {DisplayMethodsMap}
		 * @protected
		 */
		this._displayMethodsMap = this._createDisplayMethodsMap(version);

		/**
		 *
		 * @type {string}
		 * @protected
		 */
		this._tizenVersion = version;

		/**
		 * @type {number}
		 * @protected
		 */
		this._displayRatio = ResolutionInfo[osdResolution].height / containerRect.getSizeY();
	}

	/**
	 * @override
	 */
	hasAspectRatioFeature() {
		return true;
	}

	/**
	 * @override
	 */
	hasAreaChangeFeature() {
		return true;
	}

	/**
	 * @override
	 */
	isAspectRatioSupported(ratio) {
		return !!this._getDisplayMethodByRatio(ratio);
	}

	/**
	 * @override
	 */
	updateViewPort() {
		const currentArea = this.getCurrentArea();
		const width = currentArea.getSizeX();
		const height = currentArea.getSizeY();

		const videoObjectStyle = this._videoObject.style;
		videoObjectStyle.top = `${currentArea.y0}px`;
		videoObjectStyle.left = `${currentArea.x0}px`;
		videoObjectStyle.width = `${width}px`;
		videoObjectStyle.height = `${height}px`;

		const {IDLE, PAUSED, PLAYING, READY} = AVPlayPlayerState;
		if ([IDLE, PAUSED, PLAYING, READY].indexOf(this._plugin.getState()) === -1) {
			return;
		}

		// WARNING: native method call order is important on some models.
		const displayMethod = this._getDisplayMethodByRatio(this._aspectRatio);
		if (displayMethod) {
			this._plugin.setDisplayMethod(displayMethod);
		}

		const isImplicitFullscreenVersion = isEq(
			upTo(this._tizenVersion, 1),
			upTo(IMPLICIT_FULLSCREEN_VERSION, 1)
		);

		if (!isImplicitFullscreenVersion || !this.isFullScreen()) {
			this._plugin.setDisplayRect(
				currentArea.x0 * this._displayRatio,
				currentArea.y0 * this._displayRatio,
				width * this._displayRatio,
				height * this._displayRatio
			);
		}
	}

	/**
	 * @param {AspectRatio} ratio
	 * @return {?AVPlayDisplayMethod}
	 * @protected
	 */
	_getDisplayMethodByRatio(ratio) {
		/**
		 * @type {Array<AVPlayDisplayMethod>}
		 */
		const supportedMethods = Object.keys(this._displayMethodsMap);

		return supportedMethods.find((method) => ratio.eq(this._displayMethodsMap[method])) || null;
	}

	/**
	 * @param {string} version
	 * @return {DisplayMethodsMap}
	 * @protected
	 */
	_createDisplayMethodsMap(version) {
		const {
			PLAYER_DISPLAY_MODE_ORIGIN_SIZE,
			PLAYER_DISPLAY_MODE_LETTER_BOX,
			PLAYER_DISPLAY_MODE_FULL_SCREEN,
			PLAYER_DISPLAY_MODE_ZOOM_16_9,
			PLAYER_DISPLAY_MODE_ZOOM_THREE_QUARTERS,
			PLAYER_DISPLAY_MODE_AUTO_ASPECT_RATIO
		} = AVPlayDisplayMethod;

		// Starting with Tizen 4.0 all but these methods will cause the PLAYER_ERROR_INVALID_PARAMETER exception
		if (isGTE(version, '4')) {
			return {
				[PLAYER_DISPLAY_MODE_AUTO_ASPECT_RATIO]: new AspectRatio(Common.AUTO, Transferring.AUTO),
				[PLAYER_DISPLAY_MODE_LETTER_BOX]: new AspectRatio(Common.AUTO, Transferring.LETTERBOX),
				[PLAYER_DISPLAY_MODE_FULL_SCREEN]: new AspectRatio(Common.AUTO, Transferring.STRETCH)
			};
		}

		return {
			[PLAYER_DISPLAY_MODE_ORIGIN_SIZE]: new AspectRatio(Common.AUTO, Transferring.AUTO),
			[PLAYER_DISPLAY_MODE_LETTER_BOX]: new AspectRatio(Common.AUTO, Transferring.LETTERBOX),
			[PLAYER_DISPLAY_MODE_FULL_SCREEN]: new AspectRatio(Common.AUTO, Transferring.STRETCH),
			[PLAYER_DISPLAY_MODE_ZOOM_16_9]: new AspectRatio(Common.X16X9, Transferring.LETTERBOX),
			[PLAYER_DISPLAY_MODE_ZOOM_THREE_QUARTERS]: new AspectRatio(Common.X4X3, Transferring.LETTERBOX)
		};
	}
}


/**
 * @typedef {!Object<
 *     AVPlayDisplayMethod,
 *     AspectRatio
 * >}
 */
export let DisplayMethodsMap;

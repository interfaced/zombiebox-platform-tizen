/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2015-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import AbstractViewPort from 'zb/device/abstract-view-port';
import {Resolution, ResolutionInfoItem, ResolutionInfo, translate} from 'zb/device/resolutions';
import {AspectRatio, Transferring} from 'zb/device/aspect-ratio/aspect-ratio';
import {Common} from 'zb/device/aspect-ratio/proportion';
import {AVPlayDisplayMethod, AVPlayPlayerState} from './consts/avplay';
import {isGTE} from './version-utils';


/**
 */
export default class ViewPort extends AbstractViewPort {
	/**
	 * @param {AVPlay} avplay
	 * @param {HTMLObjectElement} videoObject
	 * @param {ResolutionInfoItem} panelResolution
	 * @param {ResolutionInfoItem} appResolution
	 * @param {string} version
	 */
	constructor(avplay, videoObject, panelResolution, appResolution, version) {
		super(panelResolution, appResolution);

		/**
		 * @type {AVPlay}
		 * @protected
		 */
		this._avplay = avplay;

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

		const {IDLE, PAUSED, PLAYING, READY} = AVPlayPlayerState;
		if ([IDLE, PAUSED, PLAYING, READY].indexOf(this._avplay.getState()) === -1) {
			return;
		}

		// Video Object is positioned directly in app coordinates since it's part of DOM
		const videoObjectStyle = this._videoObject.style;
		videoObjectStyle.top = `${currentArea.y0}px`;
		videoObjectStyle.left = `${currentArea.x0}px`;
		videoObjectStyle.width = `${width}px`;
		videoObjectStyle.height = `${height}px`;

		const displayMethod = this.isFullScreen() ?
			AVPlayDisplayMethod.PLAYER_DISPLAY_MODE_FULL_SCREEN :
			this._getDisplayMethodByRatio(this._aspectRatio);

		if (displayMethod) {
			this._avplay.setDisplayMethod(displayMethod);
		}

		// Tizen always accepts display rect in FullHD regardless of panel and app resolution
		const fhdRect = translate(
			currentArea,
			this._appResolution,
			ResolutionInfo[Resolution.FULL_HD]
		);
		const {x: fhdWidth, y: fhdHeight} = fhdRect.getSize();

		this._avplay.setDisplayRect(
			fhdRect.x0,
			fhdRect.y0,
			fhdWidth,
			fhdHeight
		);
	}

	/**
	 * @param {AspectRatio} requestedRatio
	 * @return {?AVPlayDisplayMethod}
	 * @protected
	 */
	_getDisplayMethodByRatio(requestedRatio) {
		for (const [ratio, method] of this._displayMethodsMap.entries()) {
			if (requestedRatio.eq(/** @type {AspectRatio} */ (ratio))) {
				return /** @type {AVPlayDisplayMethod} */ (method);
			}
		}

		return null;
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

		if (isGTE(version, '5.0.0')) {
			return new Map([
				// PLAYER_DISPLAY_MODE_AUTO_ASPECT_RATIO does not seem to do anything at all
				// PLAYER_DISPLAY_MODE_LETTER_BOX does something unexplainable
				// PLAYER_DISPLAY_MODE_FULL_SCREEN does not means strictly full screen,
				// it can be applied within area as well
				[new AspectRatio(Common.AUTO, Transferring.AUTO), PLAYER_DISPLAY_MODE_FULL_SCREEN],
				[new AspectRatio(Common.AUTO, Transferring.LETTERBOX), PLAYER_DISPLAY_MODE_FULL_SCREEN],
				[new AspectRatio(Common.AUTO, Transferring.STRETCH), PLAYER_DISPLAY_MODE_FULL_SCREEN]
			]);
		}
		if (isGTE(version, '4.0.0')) {
			return new Map([
				[new AspectRatio(Common.AUTO, Transferring.AUTO), PLAYER_DISPLAY_MODE_AUTO_ASPECT_RATIO],
				[new AspectRatio(Common.AUTO, Transferring.LETTERBOX), PLAYER_DISPLAY_MODE_LETTER_BOX],
				[new AspectRatio(Common.AUTO, Transferring.STRETCH), PLAYER_DISPLAY_MODE_FULL_SCREEN]
			]);
		}

		return new Map([
			[new AspectRatio(Common.AUTO, Transferring.AUTO), PLAYER_DISPLAY_MODE_ORIGIN_SIZE],
			[new AspectRatio(Common.AUTO, Transferring.LETTERBOX), PLAYER_DISPLAY_MODE_LETTER_BOX],
			[new AspectRatio(Common.AUTO, Transferring.STRETCH), PLAYER_DISPLAY_MODE_FULL_SCREEN],
			[new AspectRatio(Common.X16X9, Transferring.LETTERBOX), PLAYER_DISPLAY_MODE_ZOOM_16_9],
			[new AspectRatio(Common.X4X3, Transferring.LETTERBOX), PLAYER_DISPLAY_MODE_ZOOM_THREE_QUARTERS]
		]);
	}
}


/**
 * @typedef {!Map<
 *     AspectRatio,
 *     AVPlayDisplayMethod
 * >}
 */
export let DisplayMethodsMap;

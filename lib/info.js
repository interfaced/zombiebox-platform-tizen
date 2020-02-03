/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2015-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import AbstractInfo from 'zb/device/abstract-info';
import {findLargest, Resolution} from 'zb/device/resolutions';
import Rect from 'zb/geometry/rect';
import {Capability} from './consts/systeminfo';


/**
 */
export default class Info extends AbstractInfo {
	/**
	 * @param {Tizen} plugin
	 */
	constructor(plugin) {
		super();

		/**
		 * @type {SystemInfo}
		 * @protected
		 */
		this._systeminfo = /** @type {SystemInfo} */ (plugin.systeminfo);

		/**
		 * @type {Object<string, Object<string, *>>}
		 * @protected
		 */
		this._properties = {};
	}

	/**
	 * @override
	 */
	type() {
		return 'tizen';
	}

	/**
	 * @override
	 */
	manufacturer() {
		return /** @type {string} */ (this._systeminfo.getCapability(Capability.MANUFACTURER));
	}

	/**
	 * @override
	 */
	model() {
		return /** @type {string} */ (this._systeminfo.getCapability(Capability.MODEL_NAME));
	}

	/**
	 * @override
	 */
	serialNumber() {
		return /** @type {string} */ (this._systeminfo.getCapability(Capability.TIZENID));
	}

	/**
	 * @override
	 */
	version() {
		return /** @type {string} */ (this._systeminfo.getCapability(Capability.PLATFORM_VERSION));
	}

	/**
	 * @override
	 */
	softwareVersion() {
		return /** @type {string} */ (this._systeminfo.getCapability(Capability.PLATFORM_WEB_API_VERSION));
	}

	/**
	 * @override
	 */
	hardwareVersion() {
		return /** @type {string} */ (this._systeminfo.getCapability(Capability.PLATFORM_NATIVE_API_VERSION));
	}

	/**
	 * @override
	 */
	getOSDResolution() {
		return findLargest(Rect.createByNumbers(
			0,
			0,
			window.screen.width,
			window.screen.height
		)) || Resolution.HD;
	}

	/**
	 * @override
	 */
	getPanelResolution() {
		return findLargest(Rect.createByNumbers(
			0,
			0,
			/** @type {number} */ (this._systeminfo.getCapability(Capability.SCREEN_WIDTH)),
			/** @type {number} */ (this._systeminfo.getCapability(Capability.SCREEN_HEIGHT))
		)) || Resolution.FULL_HD;
	}

	/**
	 * @return {Promise}
	 */
	init() {
		const targetProperties = ['WIFI_NETWORK', 'ETHERNET_NETWORK', 'LOCALE'];

		const requests = targetProperties.map((propertyName) => this._fetchProperty(propertyName)
			.then((propertyValue) => [propertyName, propertyValue])
		);

		return Promise.all(requests)
			.then((keyValues) => keyValues.forEach((keyValue) => {
				// Keep value to provide sync access to the properties
				this._properties[keyValue[0]] = keyValue[1];
			}));
	}

	/**
	 * @param {string} propertyName
	 * @return {Object}
	 */
	getProperty(propertyName) {
		return this._properties[propertyName] || {};
	}

	/**
	 * @override
	 */
	_getLocale() {
		const localeProperty = this.getProperty('LOCALE');

		return this._normalizeLocale(localeProperty['language']);
	}

	/**
	 * @param {string} rawLocale
	 * @return {string}
	 * @protected
	 */
	_normalizeLocale(rawLocale) {
		const locale = rawLocale.replace('_', '-').split('.')[0];

		return locale || '';
	}

	/**
	 * @param {string} propertyName
	 * @return {Promise<?>}
	 * @protected
	 */
	_fetchProperty(propertyName) {
		const typedPropertyName = /** @type {SystemInfoPropertyId} */ (propertyName);

		return new Promise((resolve) => {
			try {
				this._systeminfo.getPropertyValue(typedPropertyName, resolve, () => resolve(undefined));
			} catch (e) {
				resolve(undefined);
			}
		});
	}
}

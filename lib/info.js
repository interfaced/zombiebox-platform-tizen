/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2015-2019, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import AbstractInfo from 'zb/device/abstract-info';
import {Resolution} from 'zb/device/resolutions';


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

		/**
		 * @type {SystemInfoDeviceCapability}
		 * @protected
		 */
		this._capabilities = this._systeminfo.getCapabilities();
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
		return 'Samsung';
	}

	/**
	 * @override
	 */
	model() {
		const buildProperty = /** @type {SystemInfoBuild} */ (this.getProperty('BUILD'));

		return buildProperty.model;
	}

	/**
	 * @override
	 */
	serialNumber() {
		return this._capabilities.duid;
	}

	/**
	 * @override
	 */
	version() {
		return this._capabilities.platformVersion;
	}

	/**
	 * @override
	 */
	softwareVersion() {
		return this._capabilities.webApiVersion;
	}

	/**
	 * @override
	 */
	hardwareVersion() {
		return this._capabilities.nativeApiVersion;
	}

	/**
	 * @override
	 */
	osdResolutionType() {
		const display = /** @type {SystemInfoDisplay} */ (this.getProperty('DISPLAY'));
		const resolutions = this._getResolutionsByScreenSize(display.resolutionWidth, display.resolutionHeight);

		return resolutions[0] || Resolution.HD;
	}

	/**
	 * @return {Promise}
	 */
	init() {
		const targetProperties = ['BUILD', 'WIFI_NETWORK', 'DISPLAY', 'ETHERNET_NETWORK', 'LOCALE'];

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

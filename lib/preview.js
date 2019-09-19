/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2015-2019, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {isGTE} from './version-utils';


/**
 * @enum {string}
 */
export const PreviewTileAspect = {
	W16H9: '16by9',
	W4H3: '4by3',
	W1H1: '1by1',
	W2H3: '2by3'
};

/**
 * @const {string}
 */
export const VERSION_SINCE_SUPPORTED = '2.4';

/**
 * @return {boolean}
 */
export const isSupported = () => {
	try {
		checkPreviewSupported();

		return true;
	} catch (e) {
		return false;
	}
};

/**
 * @return {boolean}
 */
export const canSetPreviewNotThroughService = () => {
	try {
		checkCanSetPreviewNotThroughService();

		return true;
	} catch (e) {
		return false;
	}
};

/**
 * @param {PreviewData} data
 * @return {Promise}
 */
export const setPreview = (data) => new Promise((resolve, reject) => {
	checkPreviewSupported();
	checkCanSetPreviewNotThroughService();

	window.webapis.setPreviewData(
		JSON.stringify(serialize(data)),
		resolve,
		reject
	);
});

/**
 * @param {PreviewData} data
 * @param {string} serviceId
 * @return {Promise}
 */
export const setPreviewThroughService = (data, serviceId) => new Promise((resolve, reject) => {
	checkPreviewSupported();

	const appControlData = new window.tizen.ApplicationControlData('previewData', [
		JSON.stringify(serialize(data))
	]);

	const appControl = new window.tizen.ApplicationControl(null, null, null, null, [appControlData]);

	window.tizen.application.launchAppControl(
		appControl,
		serviceId,
		resolve,
		reject
	);
});

/**
 * @throws {Error}
 */
export const checkPreviewSupported = () => {
	const platformVersion = window.tizen.systeminfo.getCapabilities().webApiVersion;

	if (!isGTE(platformVersion, VERSION_SINCE_SUPPORTED)) {
		throw new Error(
			`Preview support only available on Tizen >= ${VERSION_SINCE_SUPPORTED}`
		);
	}
};

/**
 * @throws {Error}
 */
export const checkCanSetPreviewNotThroughService = () => {
	const platformVersion = window.tizen.systeminfo.getCapabilities().webApiVersion;

	if (platformVersion !== VERSION_SINCE_SUPPORTED) {
		throw new Error(
			`Preview may be set not through a service on Tizen ${VERSION_SINCE_SUPPORTED} 
			exclusively, use setPreviewThroughService instead`
		);
	}
};

/**
 * @param {PreviewData} data
 * @return {Object}
 */
const serialize = (data) => ({
	'sections': data.sections.map(serializeSection)
});

/**
 * @param {PreviewSection} data
 * @return {Object}
 */
const serializeSection = (data) => {
	const section = {
		'title': data.title,
		'tiles': data.tiles.map(serializeTile)
	};

	if (data.position !== undefined) {
		section['position'] = data.position;
	}

	return section;
};

/**
 * @param {PreviewTile} data
 * @return {Object}
 */
const serializeTile = (data) => {
	const tile = {
		'image_url': data.imageUrl,
		'image_ratio': data.imageRatio,
		'is_playable': data.isPlayable,
		'action_data': JSON.stringify(data.actionData)
	};

	if (data.title !== undefined) {
		tile['title'] = data.title;
	}

	if (data.subtitle !== undefined) {
		tile['subtitle'] = data.subtitle;
	}

	if (data.position !== undefined) {
		tile['position'] = data.position;
	}

	if (data.displayFrom !== undefined) {
		tile['display_from'] = data.displayFrom;
	}

	if (data.displayUntil !== undefined) {
		tile['display_until'] = data.displayUntil;
	}

	return tile;
};

/**
 * @typedef {{
 *     sections: !Array<PreviewSection>
 * }}
 */
export let PreviewData;


/**
 * @typedef {{
 *     title: string,
 *     tiles: !Array<PreviewTile>,
 *     position: (number|undefined)
 * }}
 */
export let PreviewSection;


/**
 * @typedef {{
 *     title: (string|undefined),
 *     subtitle: (string|undefined),
 *     position: (number|undefined),
 *     imageUrl: string,
 *     imageRatio: !(PreviewTileAspect|number),
 *     actionData: Object,
 *     isPlayable: boolean,
 *     displayFrom: (number|undefined),
 *     displayUntil: (number|undefined)
 * }}
 */
export let PreviewTile;

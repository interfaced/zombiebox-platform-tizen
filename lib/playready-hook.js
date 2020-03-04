/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2015-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PlayReadyClient from 'zb/device/drm/playready-client';
import {AVPlayDrmType, AVPlayDrmOperation} from './consts/avplay';
import BaseDRMHook from './base-drm-hook';


/**
 */
export default class PlayReadyHook extends BaseDRMHook {
	/**
	 * @param {PlayReadyClient} client
	 */
	constructor(client) {
		super(client);

		/**
		 * @override
		 * @type {PlayReadyClient}
		 */
		this._client;

		/**
		 * @type {boolean}
		 * @protected
		 */
		this._drmWasInitialized = false;
	}

	/**
	 * @return {Promise}
	 */
	async prepare() {
		await super.prepare();

		this._assertIsAlive();

		const params = {
			'DeleteLicenseAfterUse': true
		};

		if (this._client.getCustomData()) {
			params['CustomData'] = this._client.getCustomData();
		}

		if (this._client.licenseServer) {
			params['LicenseServer'] = this._client.licenseServer;
		}

		try {
			this._avplay.setDrm(AVPlayDrmType.PLAY_READY, AVPlayDrmOperation.SET_PROPERTIES, JSON.stringify(params));
			this._drmWasInitialized = true;
		} catch (e) {
			this._onError(e);
		}
	}

	/**
	 */
	destroy() {
		if (this._drmWasInitialized && !this._isHigherThan5) {
			this._avplay.setDrm(AVPlayDrmType.PLAY_READY, AVPlayDrmOperation.FINALIZE, '');
		}

		super.destroy();
	}
}

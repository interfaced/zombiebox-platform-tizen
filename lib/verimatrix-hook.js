import VerimatrixClient from 'zb/device/drm/verimatrix-client';
import {AVPlayDrmType, AVPlayDrmOperation} from './consts/avplay';
import BaseDRMHook from './base-drm-hook';


/**
 */
export default class VerimatrixHook extends BaseDRMHook {
	/**
	 * @param {VerimatrixClient} client
	 */
	constructor(client) {
		super(client);

		/**
		 * @override
		 * @type {VerimatrixClient}
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

		const clientParams = this._client.getParams();

		const params = {
			'CompanyName': clientParams.company || '',
			'Web': clientParams.address || '',
			'IPTV': clientParams.iptv || ''
		};

		try {
			if (this._isHigherThan5) {
				this._avplay.setDrm(
					AVPlayDrmType.VERIMATRIX,
					AVPlayDrmOperation.SET_PROPERTIES,
					JSON.stringify(params)
				);
			} else {
				this._avplay.setDrm(AVPlayDrmType.VERIMATRIX, AVPlayDrmOperation.INITIALIZE, JSON.stringify(params));
			}
			this._drmWasInitialized = true;
		} catch (e) {
			this._onError(e);
		}
	}

	/**
	 */
	destroy() {
		if (this._drmWasInitialized && !this._isHigherThan5) {
			this._avplay.setDrm(AVPlayDrmType.VERIMATRIX, AVPlayDrmOperation.FINALIZE, '');
		}

		super.destroy();
	}

	/**
	 * @param {Object} data
	 */
	onAVPlayEvent(data) {
		if (data['name'] === 'DrmError') {
			const message = [
				'Verimatrix error',
				data['code'],
				data['message']
			]
				.filter((piece) => piece !== undefined)
				.join(' ');

			this._onError(new Error(message));
		}
	}

	/**
	 * @return {Promise}
	 * @protected
	 */
	async _init() {
		if (this._isHigherThan5) {
			this._avplay.getUID(AVPlayDrmType.VERIMATRIX);
		} else {
			this._avplay.setDrm(AVPlayDrmType.VERIMATRIX, AVPlayDrmOperation.GET_UID, '');
		}
		await super._init();
	}
}

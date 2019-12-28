import EventPublisher from 'zb/events/event-publisher';
import IDrmClient from 'zb/device/interfaces/i-drm-client';
import {Type} from 'zb/device/drm/drm';
import {isGTE} from './version-utils';
import {Capability} from './consts/systeminfo';


/**
 */
export default class BaseDrmHook extends EventPublisher {
	/**
	 * @param {IDrmClient} client
	 */
	constructor(client) {
		super();

		/**
		 * @type {Type|string}
		 */
		this.type = client.type;

		/**
		 * @type {AVPlay}
		 * @protected
		 */
		this._avplay = window.webapis.avplay;

		/**
		 * @type {boolean}
		 * @protected
		 */
		this._isHigherThan5 = isGTE(
			/** @type {string} */ (window.tizen.systeminfo.getCapability(Capability.PLATFORM_VERSION)),
			'5.0'
		);

		/**
		 * @type {IDrmClient}
		 * @protected
		 */
		this._client = client;

		/**
		 * @type {Promise}
		 * @protected
		 */
		this._initPromise = null;

		/**
		 * Fired with: {Error}
		 * @const {string}
		 */
		this.EVENT_ERROR = 'error';

		this._onClientError = (event, error) => this._fireEvent(this.EVENT_ERROR, error);
		this._client.on(this._client.EVENT_ERROR, this._onClientError);

		this._initPromise = this._init();
	}

	/**
	 * @return {Promise}
	 */
	async prepare() {
		await this._initPromise;
		this._assertIsAlive();
		await this._client.prepare();
	}

	/**
	 */
	destroy() {
		this._client.off(this._client.EVENT_ERROR, this._onClientError);
		this._client = null;
		this._initPromise = null;
	}

	/**
	 * @param {Object} data
	 */
	onAVPlayEvent(data) { // eslint-disable-line no-unused-vars
		// Descendants may handle some events
	}

	/**
	 * @return {Promise}
	 * @protected
	 */
	async _init() {
		await this._client.init();
	}

	/**
	 * @param {Error} error
	 * @protected
	 */
	_onError(error) {
		this._fireEvent(this.EVENT_ERROR, error);
	}

	/**
	 * @return {boolean}
	 * @protected
	 */
	_isDestroyed() {
		return !this._initPromise;
	}

	/**
	 * @throws {Error}
	 * @protected
	 */
	_assertIsAlive() {
		if (this._isDestroyed()) {
			throw new Error('Hook destroyed while preparing');
		}
	}
}

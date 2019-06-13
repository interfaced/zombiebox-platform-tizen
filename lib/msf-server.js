/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2015-2019, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import EventPublisher from 'zb/events/event-publisher';


/**
 */
export default class MSFServer extends EventPublisher {
	/**
	 * @param {string} serverName
	 */
	constructor(serverName) {
		super();

		/**
		 * @type {msf.Service}
		 * @protected
		 */
		this._service;

		/**
		 * @type {msf.Channel}
		 * @protected
		 */
		this._channel;

		/**
		 * @type {string}
		 * @protected
		 */
		this._ownClientName = serverName;

		/**
		 * @type {msf.MSF}
		 * @protected
		 */
		this._msf = window.msf;

		/**
		 * Fired with: {msf.Client}
		 * @const {string}
		 */
		this.EVENT_SERVER_STARTED = 'msf-server-started';

		/**
		 * Fired with: {msf.Client}
		 * @const {string}
		 */
		this.EVENT_SERVER_STOPPED = 'msf-server-stopped';

		/**
		 * Fired with: {msf.Client}
		 * @const {string}
		 */
		this.EVENT_CLIENT_CONNECTED = 'client-connected';

		/**
		 * Fired with: {msf.Client}
		 * @const {string}
		 */
		this.EVENT_CLIENT_DISCONNECTED = 'client-disconnected';

		/**
		 * Fired with: {Error|string}
		 * @const {string}
		 */
		this.EVENT_ERROR = 'msf-server-error';
	}

	/**
	 * @param {string|msf.Client} target
	 * @param {string} event
	 * @param {*=} opt_message
	 */
	sendEvent(target, event, opt_message) {
		this._assertChannel();

		this._channel.publish(event, opt_message, typeof target === 'string' ? target : target.id);
	}

	/**
	 * @param {string} event
	 * @param {function(*, msf.Client)} callback
	 */
	onRemoteEvent(event, callback) {
		this._assertChannel();

		this._channel.on(event, callback);
	}

	/**
	 * @param {string} event
	 * @param {function(*, msf.Client)} callback
	 */
	offRemoteEvent(event, callback) {
		this._assertChannel();

		this._channel.off(event, callback);
	}

	/**
	 * @param {string} event
	 * @param {function(*, msf.Client)} callback
	 */
	onceRemoteEvent(event, callback) {
		this._assertChannel();

		this._channel.once(event, callback);
	}

	/**
	 * @param {string} channelName
	 * @return {IThenable}
	 */
	start(channelName) {
		return this._createLocalService()
			.then((service) => {
				this._service = service;
				this._channel = service.channel(channelName);
				this._bindListeners();
			})
			.then(() => this._connect())
			.then(() => {/* Consume resolve value */})
			.catch((error) => {
				this._fireEvent(this.EVENT_ERROR, error);

				return Promise.reject(error);
			});
	}

	/**
	 * @return {IThenable<msf.Service>}
	 * @protected
	 */
	_createLocalService() {
		return new Promise((resolve, reject) => {
			this._msf.local((error, service) => {
				if (error) {
					reject(error);
				} else {
					resolve(service);
				}
			});
		});
	}

	/**
	 * @protected
	 */
	_bindListeners() {
		this._channel.on('connect', () => {
			this._fireEvent(this.EVENT_SERVER_STARTED);
		});

		this._channel.on('disconnect', () => {
			this._fireEvent(this.EVENT_SERVER_STOPPED);
		});

		this._channel.on('clientConnect', (clientParam) => {
			const client = /** @type {msf.Client} */ (clientParam);
			this._fireEvent(this.EVENT_CLIENT_CONNECTED, client);
		});

		this._channel.on('clientDisconnect', (clientParam) => {
			const client = /** @type {msf.Client} */ (clientParam);
			this._fireEvent(this.EVENT_CLIENT_DISCONNECTED, client);
		});
	}

	/**
	 * @return {IThenable<msf.Client>}
	 * @protected
	 */
	_connect() {
		return new Promise((resolve, reject) => {
			this._channel.connect(
				{name: this._ownClientName},
				(error, client) => {
					if (error) {
						reject(error);
					} else {
						resolve(client);
					}
				}
			);
		});
	}

	/**
	 * @throws {Error}
	 * @protected
	 */
	_assertChannel() {
		if (!this._channel) {
			throw new Error('msf connection is not established');
		}
	}
}

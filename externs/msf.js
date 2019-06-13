// Samsung SmartView SDK (previously known as MultiScreen SDK)
// Based on https://smartviewsdk.github.io/API-GUIDE/js-api/docs/api.html

const msf = {};


/**
 */
msf.MSF = class {
	/**
	 * @param {?function(?Error, ?Array<msf.Service>)=} opt_callback
	 * @return {msf.Search}
	 */
	search(opt_callback) {}

	/**
	 * @param {function(?Error, ?msf.Service)} callback
	 */
	local(callback) {}

	/**
	 * @param {string} uri
	 * @param {function(?Error, ?msf.Service)} callback
	 */
	remote(uri, callback) {}
};


/**
 * We don't need this class on TV, so its description is omitted
 */
msf.Application = class {};


/**
 */
msf.Service = class {
	/**
	 */
	constructor() {
		/**
		 * @type {string}
		 */
		this.id;

		/**
		 * @type {string}
		 */
		this.name;

		/**
		 * @type {string}
		 */
		this.version;

		/**
		 * @type {string}
		 */
		this.type;

		/**
		 * @type {string}
		 */
		this.uri;

		/**
		 * @type {string}
		 */
		this.device;
	}

	/**
	 * @param {string} appId
	 * @param {string} channelUri
	 * @return {msf.Application}
	 */
	application(appId, channelUri) {}

	/**
	 * @param {string} uri
	 * @return {msf.Channel}
	 */
	channel(uri) {}
};


/**
 */
msf.Channel = class extends msf.EventEmitter {
	/**
	 */
	constructor() {
		super();

		/**
		 * @deprecated ClientList tries to inherit from Array, but this does not properly work. Avoid using
		 * this property.
		 * @type {msf.ClientList}
		 */
		this.clients;

		/**
		 * @type {boolean}
		 */
		this.isConnected;

		/**
		 * @type {boolean}
		 */
		this.connectionTimeout;
	}

	/**
	 * @param {Object} attributes
	 * @param {function(Error, msf.Client)} callback
	 */
	connect(attributes, callback) {}

	/**
	 * @param {function(Error, msf.Client)} callback
	 */
	disconnect(callback) {}

	/**
	 * @param {string} event
	 * @param {*} message
	 * @param {string|Array<string>} target
	 * @param {ArrayBuffer=} opt_payload
	 */
	publish(event, message, target, opt_payload) {}

	/**
	 * @param {boolean} value
	 */
	setSecurityMode(value) {}
};


/**
 */
msf.Client = class {
	/**
	 */
	constructor() {
		/**
		 * @type {string}
		 */
		this.id;

		/**
		 * @dict
		 * @type {Object}
		 */
		this.attributes;

		/**
		 * @type {boolean}
		 */
		this.isHost;

		/**
		 * @type {number}
		 */
		this.connectTime;
	}
};


/**
 */
msf.ClientList = class extends Array {
	/**
	 */
	constructor() {
		super();

		/**
		 * @type {msf.Client}
		 */
		this.me;
	}

	/**
	 * @param {string} id
	 * @return {msf.Client}
	 */
	getById(id) {}
};


/**
 */
msf.Search = class extends msf.EventEmitter {
	/**
	 */
	start() {}

	/**
	 */
	stop() {}
};


/**
 */
msf.EventEmitter = class {
	/**
	 * @param {string} event
	 * @param {function(*, msf.Client)} listener
	 */
	on(event, listener) {}

	/**
	 * @param {string} event
	 * @param {function(*, msf.Client)} listener
	 */
	once(event, listener) {}

	/**
	 * @param {string} event
	 * @param {function(*, msf.Client)} listener
	 */
	off(event, listener) {}

	/**
	 * @param {string} event
	 */
	removeAllListeners(event) {}
};


/**
 * @type {msf.MSF};
 */
window.msf;

/**
 * This interface provides methods to use the ProductInfo functionalities.
 */
class ProductInfoManager {
	/**
	 * This method get the plugin's version number.
	 * Since : 1.0
	 * Privilege level: public
	 * Privilege: http://developer.samsung.com/privilege/productinfo
	 * @return {string}
	 */
	getVersion() {}

	/**
	 * This method get Firmware's information
	 * Since : 1.0
	 * Privilege level: public
	 * Privilege: http://developer.samsung.com/privilege/productinfo
	 * @return {string}
	 */
	getFirmware() {}

	/**
	 * This method get DUID.
	 * Since : 1.0
	 * Privilege level: public
	 * Privilege: http://developer.samsung.com/privilege/productinfo
	 * @return {string}
	 */
	getDuid() {}

	/**
	 * This method get Modelcode. (e.g: 15_HAWKP)
	 * Since : 1.0
	 * Privilege level: public
	 * Privilege: http://developer.samsung.com/privilege/productinfo
	 * @return {string}
	 */
	getModelCode() {}

	/**
	 * This method get real model. (e.g: UJS9500)
	 * Since : 1.0
	 * Privilege level: public
	 * Privilege: http://developer.samsung.com/privilege/productinfo
	 * @return {string}
	 */
	getModel() {}

	/**
	 * This method get the infolink server type.
	 * Since : 1.0
	 * Privilege level: public
	 * Privilege: http://developer.samsung.com/privilege/productinfo
	 * @return {ProductInfoManager.ProductInfoSiServerType}
	 */
	getSmartTVServerType() {}

	/**
	 * This method get the infolink server version, like T-INFOLINK2014-1002
	 * Since : 1.0
	 * Privilege level: public
	 * Privilege: http://developer.samsung.com/privilege/productinfo
	 * @return {string}
	 */
	getSmartTVServerVersion() {}

	/**
	 * This method get the tuner value via factory info.
	 * Since : 1.0
	 * Privilege level: public
	 * Privilege: http://developer.samsung.com/privilege/productinfo
	 * @return {string}
	 */
	getTunerEpop() {}

	/**
	 * This method check whether TV is on Soccer Mode.
	 * Since : 1.0
	 * Privilege level: public
	 * Privilege: http://developer.samsung.com/privilege/productinfo
	 * Return value:
	 *  true is soccer mode
	 *  false is non soccer mode
	 * @return {boolean}
	 */
	isSoccerModeEnabled() {}

	/**
	 * This method check whether Ttv is supported.
	 * Since : 1.0
	 * Privilege level: public
	 * Privilege: http://developer.samsung.com/privilege/productinfo
	 * Return value:
	 *  true is support
	 *  false is not support
	 * @return {boolean}
	 */
	isTtvSupported() {}

	/**
	 * This method check whether 4K UHD Panel is supported.
	 * Privilege level: public
	 * Privilege: http://developer.samsung.com/privilege/productinfo
	 * Return value:
	 *  true is support
	 *  false is not support
	 * @return {boolean}
	 */
	isUdPanelSupported() {}

	/**
	 * @return {boolean}
	 */
	is8KPanelSupported() {}

	/**
	 * This method get real model name (e.g: UN65JS9500)
	 * Since : 1.0
	 * Privilege level: public
	 * Privilege: http://developer.samsung.com/privilege/productinfo
	 * @return {string}
	 */
	getRealModel() {}

	/**
	 * This method check whether support Noglass 3d.
	 * Since : 1.0
	 * Privilege level: public
	 * Privilege: http://developer.samsung.com/privilege/productinfo
	 * @return {ProductInfoManager.ProductInfoNoGlass3dSupport}
	 */
	getNoGlass3dSupport() {}

	/**
	 * This method get local set.
	 * Since : 1.0
	 * Privilege level: public
	 * Privilege: http://developer.samsung.com/privilege/productinfo
	 * @return {string}
	 */
	getLocalSet() {}

	/**
	 * This method get system config which is specified by input parameter (e.g: service country code).
	 * Since : 1.0
	 * Privilege level: public
	 * Privilege: http://developer.samsung.com/privilege/productinfo
	 * Parameters:
	 * key: Key of each Product Info config
	 * Exceptions:
	 *  WebAPIException
	 *  with error type TypeMismatchError, if invalid ProductInfoConfigKey type passed for 'key' parameter
	 * @param {ProductInfoManager.ProductInfoConfigKey} key
	 * @return {string}
	 */
	getSystemConfig(key) {}

	/**
	 * This method set system config which is specified by input parameter.
	 * Since : 1.0
	 * Privilege level: public
	 * Privilege: http://developer.samsung.com/privilege/productinfo
	 * Exceptions:
	 *  WebAPIException
	 *  with error type TypeMismatchError, if invalid ProductInfoConfigKey type passed for 'key' parameter
	 *  with error type TypeMismatchError, if invalid DOMString type passed for 'value' parameter
	 *  with error type TypeMismatchError, if invalid SuccessCallback type passed for 'onsuccess' parameter
	 *  with error type TypeMismatchError, if invalid ErrorCallback type passed for 'onerror' parameter
	 *  with error type NotSupportedError, if VCONF_KEY_SERVICE_COUNTRY' is readonly
	 *  with error type NotSupportedError, if CONFIG_KEY_SHOPLOGO' is readonly
	 * @param {ProductInfoManager.ProductInfoConfigKey} key
	 * @param {string} value
	 * @param {Function=} onsuccess
	 * @param {Function=} onerror
	 */
	setSystemConfig(key, value, onsuccess, onerror) {}

	/**
	 * This method add callback to listen the change of system config.
	 * Since : 1.0
	 * Privilege level: public
	 * Privilege: http://developer.samsung.com/privilege/productinfo
	 * Exceptions:
	 *  WebAPIException
	 *  with error type TypeMismatchError, if invalid TvInfoMenuKey type passed for 'key' parameter
	 *  with error type TypeMismatchError, if invalid ChangeCallback type passed for 'onchange' parameter
	 * @param {Function} listener
	 * @param {ProductInfoManager.ProductInfoConfigKey} key
	 * @return {number} Value of listener id
	 */
	addSystemConfigChangeListener(listener, key) {}

	/**
	 * This method remove callback which was added to listen the change of system config.
	 * Since : 1.0
	 * Privilege level: public
	 * Privilege: http://developer.samsung.com/privilege/productinfo
	 * Exceptions:
	 *  WebAPIException
	 *  with error type TypeMismatchError, if invalid DOMString type passed for 'a' parameter
	 * @param {number} listenerId
	 */
	removeSystemConfigChangeListener(listenerId) {}
}


/**
 * @enum {number}
 */
ProductInfoManager.ProductInfoNoGlass3dSupport = {
	NO_GLASS_3D_NOT_SUPPORTED: 0,
	NO_GLASS_3D_SUPPORTED: 1
};


/**
 * @enum {number}
 */
ProductInfoManager.ProductInfoSiServerType = {
	SI_TYPE_OPERATIING_SERVER: 0,
	SI_TYPE_DEVELOPMENT_SERVER: 1,
	SI_TYPE_DEVELOPING_SERVER: 2
};


/**
 * @enum {number}
 */
ProductInfoManager.ProductInfoConfigKey = {
	CONFIG_KEY_DATA_SERVICE: 0,
	CONFIG_KEY_SERVICE_COUNTRY: 1,
	CONFIG_KEY_SHOPLOGO: 2,
	CONFIG_KEY_CHANNELBOUND_APPS_TICKER: 3,
	CONFIG_KEY_SUPPORT_SOCCER_PANEL: 4,
	CONFIG_KEY_SUPPORT_ONTV_PANEL: 5,
	CONFIG_KEY_SUPPORT_NEWSON_PANEL: 6,
	CONFIG_KEY_SUPPORT_MYCONTENTS_PANEL: 7,
	CONFIG_KEY_SUPPORT_GAME_PANEL: 8,
	CONFIG_KEY_SUPPORT_CLIPS_PANEL: 9,
	CONFIG_KEY_SUPPORT_APPS_PANEL: 10,
	CONFIG_KEY_SYSTEM_PNP_COUNTRY: 11
};

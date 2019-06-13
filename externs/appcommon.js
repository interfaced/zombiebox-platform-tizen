/**
 * This interface provides methods to use the AppCommon functionalities.
 */
class AppCommonManager {
	/**
	 * This method set screen saver according to ScreenSaver api.
	 * Since : 1.0
	 * Exceptions:
	 *  WebAPIException
	 *  with error type TypeMismatchError, if invalid AppCommonScreenSaverState type passed for 'state' parameter
	 *  with error type TypeMismatchError, if invalid SuccessCallback type passed for 'onsuccess' parameter
	 *  with error type TypeMismatchError, if invalid ErrorCallback type passed for 'onerror' parameter
	 * @param {AppCommonManager.prototype.AppCommonScreenSaverState} state
	 * @param {Function=} onsuccess
	 * @param {Function=} onerror
	 */
	setScreenSaver(state, onsuccess, onerror) {}

	/**
	 * This method get the plugin's version number.
	 * Since : 1.0
	 * @return {string}
	 */
	getVersion() {}
}


/**
 * @enum {number}
 */
AppCommonManager.prototype.AppCommonScreenSaverState = {
	SCREEN_SAVER_OFF: 0,
	SCREEN_SAVER_ON: 1
};

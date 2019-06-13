/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2015-2019, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * @enum {string}
 */
export const AVPlayPlayerState = {
	NONE: 'NONE',
	IDLE: 'IDLE',
	READY: 'READY',
	PLAYING: 'PLAYING',
	PAUSED: 'PAUSED'
};


/**
 * @enum {number}
 */
export const AVPlaySpeed = {
	X32: 32,
	X16: 16,
	X8: 8,
	X4: 4,
	X2: 2,
	X1: 1,
	REW1: -1,
	REW2: -2,
	REW4: -4,
	REW8: -8,
	REW16: -16,
	REW32: -32
};


/**
 * @enum {string}
 */
export const AVPlayDisplayMethod = {
	PLAYER_DISPLAY_MODE_LETTER_BOX: 'PLAYER_DISPLAY_MODE_LETTER_BOX',
	PLAYER_DISPLAY_MODE_ORIGIN_SIZE: 'PLAYER_DISPLAY_MODE_ORIGIN_SIZE',
	PLAYER_DISPLAY_MODE_FULL_SCREEN: 'PLAYER_DISPLAY_MODE_FULL_SCREEN',
	PLAYER_DISPLAY_MODE_CROPPED_FULL: 'PLAYER_DISPLAY_MODE_CROPPED_FULL',
	PLAYER_DISPLAY_MODE_ZOOM_HALF: 'PLAYER_DISPLAY_MODE_ZOOM_HALF',
	PLAYER_DISPLAY_MODE_ZOOM_THREE_QUARTERS: 'PLAYER_DISPLAY_MODE_ZOOM_THREE_QUARTERS',
	PLAYER_DISPLAY_MODE_ORIGIN_OR_LETTER: 'PLAYER_DISPLAY_MODE_ORIGIN_OR_LETTER',
	PLAYER_DISPLAY_MODE_DST_ROI: 'PLAYER_DISPLAY_MODE_DST_ROI',
	PLAYER_DISPLAY_MODE_ZOOM_16_9: 'PLAYER_DISPLAY_MODE_ZOOM_16_9',
	PLAYER_DISPLAY_MODE_ZOOM: 'PLAYER_DISPLAY_MODE_ZOOM',
	PLAYER_DISPLAY_MODE_ZOOM_CUSTOM: 'PLAYER_DISPLAY_MODE_ZOOM_CUSTOM',
	PLAYER_DISPLAY_MODE_AUTO_ASPECT_RATIO: 'PLAYER_DISPLAY_MODE_AUTO_ASPECT_RATIO'
};


/**
 * @enum {string}
 */
export const AVPlayStreamingPropertyType = {
	COOKIE: 'COOKIE',
	USER_AGENT: 'USER_AGENT',
	PREBUFFER_MODE: 'PREBUFFER_MODE',
	ADAPTIVE_INFO: 'ADAPTIVE_INFO',
	SET_MODE_3D: 'SET_MODE_3D',
	SET_MODE_4K: 'SET_MODE_4K',
	HD_AUDIO: 'HD_AUDIO',
	WIDEVINE: 'WIDEVINE'
};


/**
 * @enum {string}
 */
export const AVPlayDrmType = {
	PLAY_READY: 'PLAYREADY',
	MARLIN: 'MARLIN',
	VERIMATRIX: 'VERIMATRIX',
	WIDEVINE_CLASSIC: 'WIDEVINE_CLASSIC',
	SECUREMEDIA: 'SECUREMEDIA',
	SDRM: 'SDRM'
};


/**
 * @enum {string}
 */
export const AVPlayDrmOperation = {
	SET_PROPERTIES: 'SETPROPERTIES',
	GEN_CHALLENGE: 'GENCHALLENGE',
	INSTALL_LICENSE: 'INSTALLLICENSE',
	DELETE_LICENSE: 'DELETELICENSE',
	PROCESS_INITIATOR: 'PROCESSINITIATOR',
	GET_VERSION: 'GETVERSION'
};


/**
 * @enum {string}
 */
export const AVPlayStreamType = {
	VIDEO: 'VIDEO',
	AUDIO: 'AUDIO',
	TEXT: 'TEXT'
};


/**
 * @see link:
 * https://developer.tizen.org/dev-guide/2.2.1/org.tizen.web.device.apireference/tizen/tizen.html#
 *      ::Tizen::WebAPIException
 * INDEX_SIZE_ERR
 * The index is not in the allowed range.
 * Since: 2.0
 *
 * DOMSTRING_SIZE_ERR
 * The specified range of text is too large.
 * Since: 2.0
 *
 * HIERARCHY_REQUEST_ERR
 * The operation would yield an incorrect node tree.
 * Since: 2.0
 *
 * WRONG_DOCUMENT_ERR
 * The object is in the wrong document.
 * Since: 2.0
 *
 * INVALID_CHARACTER_ERR
 * The string contains invalid characters.
 * Since: 2.0
 *
 * NO_DATA_ALLOWED_ERR
 * Data is specified for a node that does not support data.
 * Since: 2.0
 *
 * NO_MODIFICATION_ALLOWED_ERR
 * The object cannot be modified.
 * Since: 2.0
 *
 * NOT_FOUND_ERR
 * The object cannot be found here.
 * Since: 2.0
 *
 * NOT_SUPPORTED_ERR
 * The operation is not supported.
 * Since: 2.0
 *
 * INUSE_ATTRIBUTE_ERR
 * The specified attribute is already in use elsewhere.
 * Since: 2.0
 *
 * INVALID_STATE_ERR
 * The object is in an invalid state.
 * Since: 2.0
 *
 * SYNTAX_ERR
 * The string did not match the expected pattern.
 * Since: 2.0
 *
 * INVALID_MODIFICATION_ERR
 * The object cannot be modified in this way.
 * Since: 2.0
 *
 * NAMESPACE_ERR
 * The operation is not allowed by Namespaces in XML.
 * Since: 2.0
 *
 * INVALID_ACCESS_ERR
 * The object does not support the operation or argument.
 * Since: 2.0
 *
 * VALIDATION_ERR
 * The operation would cause the node to fail validation.
 * Since: 2.0
 *
 * TYPE_MISMATCH_ERR
 * The type of the object does not match the expected type.
 * Since: 2.0
 *
 * SECURITY_ERR
 * The operation is insecure.
 * Since: 2.0
 *
 * NETWORK_ERR
 * A network error occurred.
 * Since: 2.0
 *
 * ABORT_ERR
 * The operation was aborted.
 * Since: 2.0
 *
 * URL_MISMATCH_ERR
 * The given URL does not match another URL.
 * Since: 2.0
 *
 * QUOTA_EXCEEDED_ERR
 * The quota has been exceeded.
 * Since: 2.0
 *
 * TIMEOUT_ERR
 * The operation timed out.
 * Since: 2.0
 *
 * INVALID_NODE_TYPE_ERR
 * The supplied node is incorrect or has an incorrect ancestor for this operation.
 * Since: 2.0
 *
 * DATA_CLONE_ERR
 * The object cannot be cloned.
 * Since: 2.0
 * @enum {number}
 */
export const WebAPIExceptionCode = {
	INDEX_SIZE_ERR: 1,
	DOMSTRING_SIZE_ERR: 2,
	HIERARCHY_REQUEST_ERR: 3,
	WRONG_DOCUMENT_ERR: 4,
	INVALID_CHARACTER_ERR: 5,
	NO_DATA_ALLOWED_ERR: 6,
	NO_MODIFICATION_ALLOWED_ERR: 7,
	NOT_FOUND_ERR: 8,
	NOT_SUPPORTED_ERR: 9,
	INUSE_ATTRIBUTE_ERR: 10,
	INVALID_STATE_ERR: 11,
	SYNTAX_ERR: 12,
	INVALID_MODIFICATION_ERR: 13,
	NAMESPACE_ERR: 14,
	INVALID_ACCESS_ERR: 15,
	VALIDATION_ERR: 16,
	TYPE_MISMATCH_ERR: 17,
	SECURITY_ERR: 18,
	NETWORK_ERR: 19,
	ABORT_ERR: 20,
	URL_MISMATCH_ERR: 21,
	QUOTA_EXCEEDED_ERR: 22,
	TIMEOUT_ERR: 23,
	INVALID_NODE_TYPE_ERR: 24,
	DATA_CLONE_ERR: 25
};

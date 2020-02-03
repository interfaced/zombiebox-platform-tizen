/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2015-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/* eslint-disable import/prefer-default-export */

// See: https://developer.samsung.com/tv/develop/api-references/tizen-web-device-api-references/systeminfo-api


/**
 * The list is not comprehensive
 * @enum {string}
 */
export const Capability = {
	SCREEN_HEIGHT: 'http://tizen.org/feature/screen.height',
	SCREEN_WIDTH: 'http://tizen.org/feature/screen.width',
	MANUFACTURER: 'http://tizen.org/system/manufacturer',
	PLATFORM_VERSION: 'http://tizen.org/feature/platform.version',
	PLATFORM_WEB_API_VERSION: 'http://tizen.org/feature/platform.web.api.version',
	PLATFORM_NATIVE_API_VERSION: 'http://tizen.org/feature/platform.native.api.version',
	BUILD_RELEASE: 'http://tizen.org/system/build.release',
	BUILD_TYPE: 'http://tizen.org/system/build.type',
	BUILD_VARIANT: 'http://tizen.org/system/build.variant',
	BUILD_ID: 'http://tizen.org/system/build.id',
	MODEL_NAME: 'http://tizen.org/system/model_name',
	TIZENID: 'http://tizen.org/system/tizenid'
};

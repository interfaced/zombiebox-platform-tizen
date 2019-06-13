/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2015-2019, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {error, debug} from 'zb/console/console';
import AbstractInput from 'zb/device/abstract-input';
import UnsupportedFeature from 'zb/device/errors/unsupported-feature';
import Keys from 'zb/device/input/keys';


/**
 */
export default class Input extends AbstractInput {
	/**
	 */
	constructor() {
		super();

		this._registerDefaultButtons();
	}

	/**
	 * @override
	 */
	eventToKeyCode(e) {
		const result = super.eventToKeyCode(e);
		debug('eventToKeyCode', e.keyCode, result);

		return result;
	}

	/**
	 * @override
	 */
	isPointingDeviceSupported() {
		return true;
	}

	/**
	 * @override
	 */
	enablePointingDevice() {
		throw new UnsupportedFeature('Pointing device enabling');
	}

	/**
	 * @override
	 */
	disablePointingDevice() {
		throw new UnsupportedFeature('Pointing device disabling');
	}

	/**
	 * @param {TvKeyName} button
	 */
	registerButton(button) {
		const tizen = /** @type {Tizen} */ (window.tizen);

		try {
			tizen.tvinputdevice.registerKey(button);
		} catch (e) {
			error(e);
		}
	}

	/**
	 * @override
	 */
	_createKeysMap() {
		const map = {};

		map[TvKeyCode.KEY_LEFT] = Keys.LEFT;
		map[TvKeyCode.KEY_RIGHT] = Keys.RIGHT;
		map[TvKeyCode.KEY_UP] = Keys.UP;
		map[TvKeyCode.KEY_DOWN] = Keys.DOWN;

		map[TvKeyCode.KEY_0] = Keys.DIGIT_0;
		map[TvKeyCode.KEY_1] = Keys.DIGIT_1;
		map[TvKeyCode.KEY_2] = Keys.DIGIT_2;
		map[TvKeyCode.KEY_3] = Keys.DIGIT_3;
		map[TvKeyCode.KEY_4] = Keys.DIGIT_4;
		map[TvKeyCode.KEY_5] = Keys.DIGIT_5;
		map[TvKeyCode.KEY_6] = Keys.DIGIT_6;
		map[TvKeyCode.KEY_7] = Keys.DIGIT_7;
		map[TvKeyCode.KEY_8] = Keys.DIGIT_8;
		map[TvKeyCode.KEY_9] = Keys.DIGIT_9;

		map[TvKeyCode.KEY_MEDIA_PLAY] = Keys.PLAY;
		map[TvKeyCode.KEY_MEDIA_PAUSE] = Keys.PAUSE;
		map[TvKeyCode.KEY_MEDIA_PLAY_PAUSE] = Keys.PLAY_PAUSE;
		map[TvKeyCode.KEY_MEDIA_STOP] = Keys.STOP;
		map[TvKeyCode.KEY_MEDIA_FAST_FORWARD] = Keys.FWD;
		map[TvKeyCode.KEY_MEDIA_REWIND] = Keys.REW;

		map[TvKeyCode.KEY_BACK] = Keys.BACK;
		map[TvKeyCode.KEY_ENTER] = Keys.ENTER;
		map[TvKeyCode.KEY_MENU] = Keys.MENU;
		map[TvKeyCode.KEY_INFO] = Keys.INFO;
		map[TvKeyCode.KEY_CHANNEL_UP] = Keys.PAGE_UP;
		map[TvKeyCode.KEY_CHANNEL_DOWN] = Keys.PAGE_DOWN;

		map[TvKeyCode.KEY_VOLUME_DOWN] = Keys.VOLUME_DOWN;
		map[TvKeyCode.KEY_VOLUME_UP] = Keys.VOLUME_UP;

		map[TvKeyCode.KEY_COLOR_F0_RED] = Keys.RED;
		map[TvKeyCode.KEY_COLOR_F1_GREEN] = Keys.GREEN;
		map[TvKeyCode.KEY_COLOR_F2_YELLOW] = Keys.YELLOW;
		map[TvKeyCode.KEY_COLOR_F3_BLUE] = Keys.BLUE;

		map[TvKeyCode.KEY_EXIT] = Keys.EXIT;
		map[TvKeyCode.KEY_VOLUME_MUTE] = Keys.MUTE;

		return map;
	}

	/**
	 * @protected
	 */
	_registerDefaultButtons() {
		const keys = [
			TvKeyName.KEY_0,
			TvKeyName.KEY_1,
			TvKeyName.KEY_2,
			TvKeyName.KEY_3,
			TvKeyName.KEY_4,
			TvKeyName.KEY_5,
			TvKeyName.KEY_6,
			TvKeyName.KEY_7,
			TvKeyName.KEY_8,
			TvKeyName.KEY_9,

			TvKeyName.KEY_CHANNEL_DOWN,
			TvKeyName.KEY_CHANNEL_UP,
			TvKeyName.KEY_PREVIOUS_CHANNEL,

			TvKeyName.KEY_COLOR_F0_RED,
			TvKeyName.KEY_COLOR_F1_GREEN,
			TvKeyName.KEY_COLOR_F2_YELLOW,
			TvKeyName.KEY_COLOR_F3_BLUE,

			TvKeyName.KEY_MEDIA_PAUSE,
			TvKeyName.KEY_MEDIA_PLAY,
			TvKeyName.KEY_MEDIA_PLAY_PAUSE,
			TvKeyName.KEY_MEDIA_STOP,

			TvKeyName.KEY_MEDIA_FAST_FORWARD,
			TvKeyName.KEY_MEDIA_REWIND,
			TvKeyName.KEY_MEDIA_TRACK_NEXT,
			TvKeyName.KEY_MEDIA_TRACK_PREVIOUS,

			TvKeyName.KEY_MEDIA_RECORD
		];

		for (let i = 0; i < keys.length; i++) {
			this.registerButton(keys[i]);
		}
	}
}


/**
 * @enum {number}
 */
export const TvKeyCode = {
	KEY_LEFT: 37,
	KEY_UP: 38,
	KEY_RIGHT: 39,
	KEY_DOWN: 40,
	KEY_ENTER: 13,
	KEY_BACK: 10009,

	KEY_1: 49,
	KEY_2: 50,
	KEY_3: 51,
	KEY_4: 52,
	KEY_5: 53,
	KEY_6: 54,
	KEY_7: 55,
	KEY_8: 56,
	KEY_9: 57,
	KEY_0: 48,

	KEY_MEDIA_PLAY: 415,
	KEY_MEDIA_PAUSE: 19,
	KEY_MEDIA_PLAY_PAUSE: 10252,
	KEY_MEDIA_STOP: 413,
	KEY_MEDIA_REWIND: 412,
	KEY_MEDIA_FAST_FORWARD: 417,

	KEY_MEDIA_TRACK_NEXT: 10233,
	KEY_MEDIA_TRACK_PREVIOUS: 10232,
	KEY_MEDIA_RECORD: 416,

	KEY_COLOR_F0_RED: 403,
	KEY_COLOR_F1_GREEN: 404,
	KEY_COLOR_F2_YELLOW: 405,
	KEY_COLOR_F3_BLUE: 406,

	KEY_CAPTION: 10221,
	KEY_CHANNEL_DOWN: 428,
	KEY_CHANNEL_LIST: 10073,
	KEY_CHANNEL_UP: 427,

	KEY_VOLUME_DOWN: 448,
	KEY_VOLUME_MUTE: 449,
	KEY_VOLUME_UP: 447,

	KEY_E_MANUAL: 10146,
	KEY_EXIT: 10182,

	KEY_MTS: 10195,
	KEY_EXTRA: 10253,
	KEY_GUIDE: 458,
	KEY_INFO: 457,

	KEY_MENU: 457,
	KEY_MINUS: 189,
	KEY_PICTURE_SIZE: 10140,

	KEY_PREVIOUS_CHANNEL: 10190,
	KEY_SEARCH: 10225,
	KEY_SOCCER: 10228,

	KEY_SOURCE: 10072,
	KEY_TELETEXT: 10200,
	KEY_TOOLS: 10135
};


/**
 * @enum {string}
 */
export const TvKeyName = {
	KEY_1: '1',
	KEY_2: '2',
	KEY_3: '3',
	KEY_4: '4',
	KEY_5: '5',
	KEY_6: '6',
	KEY_7: '7',
	KEY_8: '8',
	KEY_9: '9',
	KEY_0: '0',

	KEY_MEDIA_PLAY: 'MediaPlay',
	KEY_MEDIA_PAUSE: 'MediaPause',
	KEY_MEDIA_PLAY_PAUSE: 'MediaPlayPause',
	KEY_MEDIA_STOP: 'MediaStop',
	KEY_MEDIA_REWIND: 'MediaRewind',
	KEY_MEDIA_FAST_FORWARD: 'MediaFastForward',

	KEY_MEDIA_TRACK_NEXT: 'MediaTrackNext',
	KEY_MEDIA_TRACK_PREVIOUS: 'MediaTrackPrevious',
	KEY_MEDIA_RECORD: 'MediaRecord',

	KEY_COLOR_F0_RED: 'ColorF0Red',
	KEY_COLOR_F1_GREEN: 'ColorF1Green',
	KEY_COLOR_F2_YELLOW: 'ColorF2Yellow',
	KEY_COLOR_F3_BLUE: 'ColorF3Blue',

	KEY_CAPTION: 'Caption',
	KEY_CHANNEL_DOWN: 'ChannelDown',
	KEY_CHANNEL_LIST: 'ChannelList',
	KEY_CHANNEL_UP: 'ChannelUp',

	KEY_VOLUME_DOWN: 'VolumeDown',
	KEY_VOLUME_MUTE: 'VolumeMute',
	KEY_VOLUME_UP: 'VolumeUp',

	KEY_E_MANUAL: 'E-Manual',
	KEY_EXIT: 'Exit',

	KEY_MTS: 'MTS',
	KEY_EXTRA: 'Extra',
	KEY_GUIDE: 'Guide',
	KEY_INFO: 'Info',

	KEY_MENU: 'Menu',
	KEY_MINUS: 'Minus',
	KEY_PICTURE_SIZE: 'PictureSize',

	KEY_PREVIOUS_CHANNEL: 'PreviousChannel',
	KEY_SEARCH: 'Search',
	KEY_SOCCER: 'Soccer',

	KEY_SOURCE: 'Source',
	KEY_TELETEXT: 'Teletext',
	KEY_TOOLS: 'Tools'
};

/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2015-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

module.exports.onRequest = () => {
	const requestedAppControl = tizen.application.getCurrentApplication().getRequestedAppControl();
	const data = requestedAppControl.appControl.data;
	const previewData = data.find((item) => item.key === 'previewData');

	if (previewData) {
		webapis.preview.setPreviewData(previewData.value[0], terminate, terminate);
	} else {
		terminate();
	}
};

function terminate() {
	tizen.application.getCurrentApplication().exit();
}

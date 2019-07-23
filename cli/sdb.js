/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2015-2019, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const path = require('path');
const http = require('http');
const dial = require('peer-dial');
const {execAndConfirm, parseXml} = require('./utils');

const PORT = 26101;


/**
 * @param {string} sdbDir
 * @param {string=} host
 * @return {Promise}
 */
function connect(sdbDir, host) {
	const sdb = getSdbBinary(sdbDir);

	return execAndConfirm(
		`${sdb} connect ${host}`,
		'connected',
		'The device was connected'
	)
		.catch(() => Promise.reject(
			new Error(`Couldn't connect to ${host}. Is development mode enabled on the device?`)
		));
}

/**
 * @param {string} sdbDir
 * @param {string} wgtPath
 * @param {string=} host
 * @param {number=} year
 * @return {Promise}
 */
async function install(sdbDir, wgtPath, host, year) {
	const sdb = getSdbBinary(sdbDir);

	console.log('Installation started');

	await connect(sdbDir, host);

	if (!host && !year) {
		throw new Error('At least one of device host or year is required to install application');
	}

	const uploadPath = await resolveUploadPath(host, year);
	await execAndConfirm(
		`${sdb} -s ${host}:${PORT} push ${wgtPath} ${uploadPath}`,
		'100%',
		'Wgt-file successfully pushed on TV'
	);

	await execAndConfirm(
		`${sdb} -s ${host}:${PORT} shell 0 vd_appinstall appis ${uploadPath}/${path.basename(wgtPath)}`,
		'install completed',
		'Wgt-file successfully installed on TV'
	);

	console.log('Installation done');
}


/**
 * @param {string} sdbDir
 * @param {string} applicationId
 * @param {string} host
 * @return {Promise}
 */
async function launch(sdbDir, applicationId, host) {
	const sdb = getSdbBinary(sdbDir);

	await connect(sdbDir, host);

	await execAndConfirm(
		`${sdb} -s ${host}:${PORT} shell 0 debug ${applicationId} 300`,
		'launch',
		'The app was launched'
	);
}


/**
 * @param {string=} deviceHost
 * @param {number=} deviceYear
 * @return {Promise<string>}
 */
async function resolveUploadPath(deviceHost, deviceYear) {
	const LTE_2016_UPLOAD_PATH = '/opt/usr/apps/tmp';
	const GTE_2017_UPLOAD_PATH = '/home/owner/share/tmp/sdk_tools/tmp';

	const getPath = (year) => year >= 2017 ? GTE_2017_UPLOAD_PATH : LTE_2016_UPLOAD_PATH;

	if (deviceYear) {
		if (deviceYear < 2015) {
			throw new Error('Device year should be 2015+');
		}

		return getPath(deviceYear);
	}

	return new Promise((resolve, reject) => {
		const LOOKUP_TIME = 5 * 1000;

		const client = new dial.Client();
		const lookupTimeout = setTimeout(() => client.stop(), LOOKUP_TIME);

		let resolvedYear;

		client.on('found', (descriptionUrl) => {
			if (!descriptionUrl.includes(deviceHost)) {
				return;
			}

			fetchDeviceYear(descriptionUrl)
				.then((year) => {
					resolvedYear = year;
					client.stop();
				}, () => {
					client.stop();
				});
		});

		client.on('stop', () => {
			clearTimeout(lookupTimeout);

			if (resolvedYear) {
				resolve(getPath(resolvedYear));
			} else {
				reject('Can\'t resolve device year automatically, you must pass year command (see help)');
			}
		});

		client.start();
	});
}


/**
 * @param {string} descriptionUrl
 * @return {Promise<number>}
 */
async function fetchDeviceYear(descriptionUrl) {
	return new Promise((resolve, reject) => {
		http.get(descriptionUrl, (response) => {
			if (response.statusCode !== 200) {
				reject();

				return;
			}

			let xml = '';
			response.on('data', (d) => {
				xml += d;
			});
			response.on('end', () => {
				const data = parseXml(xml);

				const productData = data.root.device[0]['sec:ProductCap'][0];
				const yearMatch = /Y(\d*)/.exec(productData);

				if (yearMatch) {
					const year = parseInt(yearMatch[1], 10);
					if (year) {
						resolve(year);
					} else {
						reject();
					}
				} else {
					reject();
				}
			});
		});
	});
}


/**
 * @param {string} toolsDir
 * @return {string}
 */
function getSdbBinary(toolsDir) {
	return path.join(toolsDir || '', 'sdb');
}

module.exports = {
	install,
	launch
};

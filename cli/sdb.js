/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2015-2019, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const os = require('os');
const path = require('path');
const {execAndConfirm} = require('./utils');


/**
 * Attempts to connect to either specified device or if already connected to one and only one use it
 * Returns connected device serialno (host)
 * @param {string} sdbDir
 * @param {string=} host
 * @return {Promise<string>}
 */
async function connect(sdbDir, host) {
	const sdb = getSdbBinary(sdbDir);

	if (host) {
		await execAndConfirm(
			`${sdb} connect ${host}`,
			'connected'
		);
		return execAndConfirm(
			`${sdb} -s ${host} get-serialno`,
			'',
			`Connected to ${host}`
		);
	}

	const devicesResponse = await execAndConfirm(
		`${sdb} devices`,
		'List of devices attached'
	);
	const devices = devicesResponse.split(os.EOL).splice(1);

	switch (devices.length) {
		case 0:
			throw new Error('No devices already connected and none were specified');
		case 1:
			return execAndConfirm(
				`${sdb} get-serialno`,
				'',
				'Selected the only connected device'
			);
		default:
			throw new Error('Several devices connected, specify one or disconnect some');
	}
}

/**
 * @param {string} sdbDir
 * @param {string} name
 * @param {string} wgtPath
 * @param {string=} host
 * @return {Promise}
 */
async function install(sdbDir, name, wgtPath, host) {
	const sdb = getSdbBinary(sdbDir);

	console.log('Installation started');

	const serialno = await connect(sdbDir, host);

	const LEGACY_INSTALL_PATH = '/opt/usr/apps/tmp';
	const capabilities = await getCapabilities(sdbDir, serialno);
	const uploadPath = capabilities.get('sdk_toolpath') || LEGACY_INSTALL_PATH;

	await execAndConfirm(
		`${sdb} -s ${serialno} push ${wgtPath} ${uploadPath}`,
		'100%',
		'Wgt-file successfully pushed on TV'
	);

	// This command is not documented anywhere and just works magically
	await execAndConfirm(
		`${sdb} -s ${serialno} shell 0 vd_appinstall ${name} ${uploadPath}/${path.basename(wgtPath)}`,
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
	const serialno = await connect(sdbDir, host);

	// This command is not documented either and also just works magically.
	// The last parameter, 300 is even more magic: Some tvs fail quietly without it,
	// others on the contrary only launch apps if it's not present.
	// Some require it, report it as erroneous but then still work.
	// ¯\_(ツ)_/¯
	const portOutput = await execAndConfirm(
		`${sdb} -s ${serialno} shell 0 debug ${applicationId}`,
		'launch',
		'The app was launched'
	).catch(async (stderr) => {
		if (stderr === 'closed') {
			return execAndConfirm(
				`${sdb} -s ${serialno} shell 0 debug ${applicationId} 300`,
				'launch',
				'The app was launched'
			);
		}
		throw stderr;
	});

	console.log(portOutput);
}

/**
 * @param {string} sdbDir
 * @param {string=} serialno
 * @return {Promise<Map<string, string>>}
 */
async function getCapabilities(sdbDir, serialno) {
	const sdb = getSdbBinary(sdbDir);

	const response = await execAndConfirm(
		`${sdb} -s ${serialno} capability`,
		''
	);
	const pairs = response.split(os.EOL)
		.map((line) => line.split(':'))
		.map(([key, ...rest]) => [key, rest.join(':')]);

	return new Map(pairs);
}


/**
 * @param {string} toolsDir
 * @return {string}
 */
function getSdbBinary(toolsDir) {
	return path.join(toolsDir || '', 'sdb');
}

module.exports = {
	connect,
	install,
	launch
};

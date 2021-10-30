/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2015-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import path from 'path';
import {execAndConfirm} from './utils.js';


/**
 * Expected output:
 *
 * Loaded in '/Users/JohnDoe/tizen-studio-data/profile/profiles.xml'.
 * [Profile Name]      [Active]
 * profileOne
 * profileTwo            O
 * profileThree
 *
 * @param {string} toolsDir
 * @return {Promise<Array<{name: string, isActive: boolean}>>}
 * @protected
 */
async function getProfiles(toolsDir) {
	const tizen = getTizenBinary(toolsDir);

	const stdout = await exec(
		`${tizen} security-profiles list`,
		'Loaded in'
	);

	const sysStrings = [
		'Loaded in',
		'[Profile Name]'
	];

	return stdout
		.split('\n')
		.map((line) => line.trim())
		.filter(Boolean)
		.filter((line) => !sysStrings.some((sysString) => line.startsWith(sysString)))
		.map((profile) => ({
			name: profile.replace(/\s+O$/, ''),
			isActive: /\s+O$/.test(profile)
		}));
}


/**
 * @param {string} toolsDir
 * @param {string} name
 * @return {Promise}
 */
export async function activateProfile(toolsDir, name) {
	const tizen = getTizenBinary(toolsDir);

	const profiles = await getProfiles(toolsDir);
	const profile = profiles.find((profile) => profile.name === name);

	if (!profile) {
		throw new Error(`No such profile: '${name}'`);
	}

	if (!profile.isActive) {
		return exec(
			`${tizen} security-profiles set-active -n ${name}`,
			'Succeed',
			`Profile "${name}" successfully activated`
		);
	}
}

/**
 * @param {string} toolsDir
 * @param {string} securityProfile
 * @param {string} srcDir
 * @param {string=} outDir
 * @return {Promise}
 */
export async function buildWgt(toolsDir, securityProfile, srcDir, outDir = srcDir) {
	const tizen = getTizenBinary(toolsDir);

	return exec(
		`${tizen} package -t wgt -s ${securityProfile} -- ${srcDir} -o ${outDir}`,
		'Package File Location'
	);
}


/**
 * @param {string} toolsDir
 * @param {string} pkgId
 * @param {string=} serialNo
 * @return {Promise}
 */
export async function uninstall(toolsDir, pkgId, serialNo) {
	const tizen = getTizenBinary(toolsDir);

	return exec(
		`${tizen} uninstall --pkgid ${pkgId}` + ((serialNo !== undefined) ? ` --serial ${serialNo}` : ''),
		'uninstall completed',
		'Application uninstalled'
	);
}


/**
 * @param {string} toolsDir
 * @return {string}
 */
function getTizenBinary(toolsDir) {
	return path.join(toolsDir || '', 'tizen');
}


/**
 * @param {string} command
 * @param {string} successResponse
 * @param {string=} successMessage
 * @return {Promise}
 */
async function exec(command, successResponse, successMessage) {
	return execAndConfirm(
		command,
		successResponse,
		successMessage
	).catch((e) => {
		const message = e instanceof Error ? e.messsage : e;
		if (message.includes('is not a valid value for "sub-command"')) {
			console.error('Incompatible Tizen tools version. Required something like "Tizen CLI 2.4.50"');
		}
		throw e;
	});
}
/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2015-2019, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const childProcess = require('child_process');
const parseXMLString = require('xml2js').parseString;


/**
 * Executes command and verifies it printed successResponse to stdout
 * If successful, returns a Promise resolved with stdout and prints successMessage
 * If failed, returns a Promise rejected with stderr (or stdout if stderr is empty)
 * @param {string} command
 * @param {string} successResponse
 * @param {string=} successMessage
 * @return {Promise}
 */
async function execAndConfirm(command, successResponse, successMessage) {
	return new Promise((resolve, reject) => {
		childProcess.exec(command, (e, stdout, stderr) => {
			if (stdout.includes(successResponse)) {
				if (successMessage) {
					console.log(successMessage);
				}
				resolve(stdout);
			} else {
				if (stderr) {
					console.error(stderr);
				}
				reject(stderr || stdout);
			}
		});
	});
}


/**
 * @param {string} string
 * @return {Promise<Object>}
 */
async function parseXml(string) {
	return new Promise((resolve, reject) => {
		parseXMLString(string, (err, result) => {
			if (!err) {
				resolve(result);
			} else {
				reject(err.message);
			}
		});
	});
}


module.exports = {
	execAndConfirm,
	parseXml
};

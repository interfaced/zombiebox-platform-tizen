/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2015-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import childProcess from 'child_process';
import {parseString as parseXMLString} from 'xml2js';


/**
 * Executes command and verifies it printed successResponse to stdout
 * If successful, returns a Promise resolved with stdout and prints successMessage
 * If failed, returns a Promise rejected with stderr (or stdout if stderr is empty)
 * @param {string} command
 * @param {string} successResponse
 * @param {string=} successMessage
 * @return {Promise}
 */
export async function execAndConfirm(command, successResponse, successMessage) {
	logger.verbose(`Executing: ${command}`);

	return new Promise((resolve, reject) => {
		childProcess.exec(command, (e, stdout, stderr) => {
			if (stdout.includes(successResponse)) {
				if (successMessage) {
					logger.info(successMessage);
				}
				resolve(stdout.trim());
			} else {
				logger.debug(`Result did not include expected output`);
				if (stderr) {
					logger.error(stderr);
				}
				reject(stderr ? stderr.trim() : stdout.trim());
			}
		});
	});
}


/**
 * @param {string} string
 * @return {Promise<Object>}
 */
export async function parseXml(string) {
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


/**
 * @typedef {{
 *     error: function(string),
 *     warn: function(string),
 *     info: function(string),
 *     verbose: function(string),
 *     debug: function(string),
 *     silly: function(string)
 * }}
 */
export let ILogger;

/**
 * @type {ILogger}
 */
const consoleLogger = {
	error: console.error.bind(console),
	warn: console.warn.bind(console),
	info: console.info.bind(console),
	verbose: console.log.bind(console),
	debug: console.debug.bind(console),
	silly: console.log.bind(console)
};

/**
 * @type {ILogger}
 */
let logger = consoleLogger;


/**
 * @param {?ILogger} newLogger
 */
export function attachLogger(newLogger) {
	logger = newLogger || consoleLogger;
}

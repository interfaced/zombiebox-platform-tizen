/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2015-2019, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// TODO: introduce zb extension for utils

/**
 * @param {string} version
 * @param {number} part
 * @return {string}
 */
export const upTo = (version, part) => {
	const parts = version.split('.');
	return parts.slice(0, part + 1).join('.');
};

/**
 * @param {string} stringA
 * @param {string} stringB
 * @return {number}
 */
export const compare = (stringA, stringB) => {
	const [numericA, preReleaseA] = stringA.split('-');
	const [numericB, preReleaseB] = stringB.split('-');

	const partsA = numericA.split('.');
	const partsB = numericB.split('.');

	for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
		const a = parseInt(partsA[i], 10) || 0;
		const b = parseInt(partsB[i], 10) || 0;

		if (a !== b) {
			return a - b;
		}
	}

	return (preReleaseA || '').localeCompare(preReleaseB || '', 'en');
};

/**
 * Returns true if the first version is greater than the second.
 * @param {string} a
 * @param {string} b - version to be compared against
 * @return {boolean}
 */
export const isGT = (a, b) => compare(a, b) > 0;

/**
 * Returns true if the first version is greater than or equal the second.
 * @param {string} a
 * @param {string} b - version to be compared against
 * @return {boolean}
 */
export const isGTE = (a, b) => compare(a, b) >= 0;

/**
 * Returns true if the first version is equal the second.
 * @param {string} a
 * @param {string} b - version to be compared against
 * @return {boolean}
 */
export const isEq = (a, b) => compare(a, b) === 0;

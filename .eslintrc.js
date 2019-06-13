const {join, dirname} = require('path');

function resolveModulePath(packageName) {
	const packageInfoPath = require.resolve(`${packageName}/package.json`);
	return join(dirname(packageInfoPath), require(packageInfoPath).module);
}

module.exports = {
	extends: 'interfaced',
	overrides: [
		{
			files: ['lib/**/*.js'],
			settings: {
				'import/resolver': {
					alias: [
						['zb', resolveModulePath('zombiebox')],
						['i18n', join(__dirname, 'lib')]
					]
				}
			},
			...require('eslint-config-interfaced/overrides/esm')
		},
		{
			files: ['lib/**/*.js'],
			rules: {
				'import/no-unresolved': ['error', {ignore: ['^generated/']}],
			},
		},
		{
			files: ['externs/*.js'],
			...require('eslint-config-interfaced/overrides/externs')
		},
		{
			files: ['docs/examples/*.js', 'index.js', 'cli/*.js'],
			...require('eslint-config-interfaced/overrides/node')
		},
		{
			files: ['docs/examples/*.js'],
			globals: {
				tizen: 'readonly',
				webapis: 'readonly'
			}
		},
		{
			files: ['docs/examples/*.js', 'index.js', 'cli/*.js'],
			rules: {
				'node/no-unsupported-features/es-builtins': ["error", { "version": ">=8.9" }],
				'node/no-unsupported-features/es-syntax': ["error", { "version": ">=8.9" }],
				'node/no-unsupported-features/node-builtins': ["error", { "version": ">=8.9" }],
				'node/no-deprecated-api': ['error', {
					'ignoreModuleItems': [
						'url.parse' // TODO: remove once node 8 support is dropped and the deprecation is handled
					]
				}]
			}
		},
		{
			files: ['externs/tizen.js'],
			rules: {
				'interfaced/lines-between-statics': 'off',
				'interfaced/statics-order': 'off'
			}
		}
	]
};

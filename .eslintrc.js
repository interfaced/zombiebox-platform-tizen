module.exports = {
	extends: 'interfaced',
	overrides: [
		{
			files: ['lib/**/*.js'],
			extends: 'interfaced/esm',
			settings: {
				'import/resolver': 'zombiebox'
			},
			rules: {
				'jsdoc/no-undefined-types': ['error', {
					definedTypes: [
						// See externs
						'msf',
						'Tizen',
						'Webapis',
						'AVPlay',
						'AudioControlManager',
						'WebAPIError',
						'ProductInfoManager',
						'PreviewManager',
						'AppCommonManager',
						'SystemInfo',
						'SystemInfoPropertyId',
					]
				}]
			}
		},
		{
			files: ['docs/examples/*.js', 'index.js', 'cli/*.js'],
			extends: 'interfaced/node'
		},
		{
			files: ['docs/examples/*.js'],
			globals: {
				tizen: 'readonly',
				webapis: 'readonly'
			}
		},
		{
			files: ['externs/*.js'],
			extends: 'interfaced/externs',
			rules: {
				'jsdoc/require-returns-check': 'off',
				'jsdoc/check-tag-names': 'off',
				'jsdoc/no-undefined-types': 'off'
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

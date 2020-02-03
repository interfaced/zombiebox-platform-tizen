const copyright = [
	'',
	' * This file is part of the ZombieBox package.',
	' *',
	` * Copyright © 2015-${(new Date).getFullYear()}, Interfaced`,
	' *',
	' * For the full copyright and license information, please view the LICENSE',
	' * file that was distributed with this source code.',
	' '
];


module.exports = {
	extends: 'interfaced',
	plugins: ['header'],
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
				}],
				'header/header': ['error', 'block', copyright]
			}
		},
		{
			files: ['docs/examples/*.js', 'index.js', 'cli/*.js'],
			extends: 'interfaced/node'
		},
		{
			files: ['cli/*.js'],
			rules: {
				'header/header': ['error', 'block', copyright]
			}
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

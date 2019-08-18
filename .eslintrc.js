module.exports = {
	extends: 'interfaced',
	rules: {
		'prefer-promise-reject-errors': ['error', {allowEmptyReject: true}],
		'jsdoc/check-tag-names': ["error", {
			definedTags: ['dict']
		}]
	},
	overrides: [
		{
			files: ['lib/**/*.js'],
			extends: 'interfaced/esm',
			settings: {
				'import/resolver': 'zombiebox'
			}
		},
		{
			files: ['externs/*.js'],
			extends: 'interfaced/externs',
			rules: {
				'jsdoc/require-returns-check': 'off'
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
			files: ['externs/tizen.js'],
			rules: {
				'interfaced/lines-between-statics': 'off',
				'interfaced/statics-order': 'off'
			}
		}
	]
};

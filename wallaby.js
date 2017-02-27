module.exports = function (wallaby) {
	return {
		files: [
			'src/**/*.js'
		],

		tests: [
			'test/**/*.js'
		],

		env: {
			type: 'node',
			runner: 'node',
			params: {
				env: 'DEBUG=*,-ava,-babel'
			}
		},

		compilers: {
			'**/*.js': wallaby.compilers.babel()
		},
		testFramework: 'ava',
		workers: {recycle: true}
	};
};

module.exports = {
    baseUrl: 'http://localhost:3000',
	gridUrl: 'http://localhost:4444/wd/hub',
    sets: {
        index: {
            files: '**/index.hermione.js'
        },
        asteroid: {
            files: '**/asteroid.hermione.js'
        },
        destructionList: {
            files: '**/destruction-list.hermione.js'
        }
    },
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            },
            screenshotsDir: 'hermione-html-report/chrome'
        }
    },
    plugins: {
		'html-reporter/hermione': {
			path: 'hermione-html-report'
		}
	},
};
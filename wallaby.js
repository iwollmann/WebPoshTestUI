var wallabyWebpack = require('wallaby-webpack');

module.exports = function (wallaby) {

    var webpackPostprocessor = wallabyWebpack({
        // webpack options

        externals: {
            // Use external version of React instead of rebuilding it
            jsdom: 'window',
            cheerio: 'window',
            'react/lib/ExecutionEnvironment': true,
            'react/lib/ReactContext': 'window'
        },
        resolve: {
            extensions: ['', '.js', '.jsx', '.json']
        }
    });

    return {
        files: [
            // not required if using PhantomJs2 - http://wallabyjs.com/docs/integration/phantomjs2.html
            { pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', instrument: false },
            { pattern: 'node_modules/react/dist/react-with-addons.js', instrument: false },

            { pattern: 'src/**/*.js*', load: false },
            { pattern: 'src/**/*tests.js*', ignore: true }
        ],

        tests: [
            { pattern: 'src/**/*tests.js*', load: false }
        ],

        compilers: {
            '**/*.js*': wallaby.compilers.babel()
        },

        postprocessor: webpackPostprocessor,

        bootstrap: function () {
            window.__moduleBundler.loadTests();
        }
    };
};
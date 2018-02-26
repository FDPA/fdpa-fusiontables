/* jshint strict: false */
/* jshint node: true */
var path = require('path');

var pathResolution = path.resolve(__dirname, 'distribution'),
    resolver = {
        extensions: ['.js'],
        alias: {
            fdpa_resolutions: '.',
            fdpa: '.',
            '': '.'
        }
    };

var es5Config = {
    entry: './src/js/fusionApi_es5.js',
    output: {
        filename: 'fusionApi_es5.js',
        path: pathResolution
    },
    resolve: resolver
};

var es6Config = {
    entry: './src/js/fusionApi.js',
    output: {
        filename: 'fusionApi.js',
        path: pathResolution
    },
    resolve: resolver
};

module.exports = [es5Config, es6Config];

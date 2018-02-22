/* jshint strict: false */
/* jshint node: true */
var path = require('path');

module.exports = {
    entry: './src/js/fusionApi_es5.js',
    output: {
        filename: 'fusionApi_es5.js',
        path: path.resolve(__dirname, 'distribution')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            fdpa_resolutions: '.',
            fdpa: '.',
            '': '.'
        }
    }
};

/* jshint strict: false */
/* jshint node: true */
var path = require('path');

module.exports = {
    entry: './app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            fdpa: '../src/js'
        }
    }
};

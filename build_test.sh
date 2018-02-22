#!/bin/bash
cd harness
mkdir -p dist
npx webpack --config webpack.test.config.js
echo ''
echo 'In a browser, navigate to file://$PWD/harness/index.html'

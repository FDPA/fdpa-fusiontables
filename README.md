# Fair Districts PA fusiontables api language binding

Provides a JS ES2015|ES6 module, src/js/fusionApi.js, which
defines JS language bindings for the
Google cloud FDPA Resolutions project,
using the Google fusiontable API.

The harness directory contains a demo-test harness in
the form of a web page that exercises fusionApi.js.
Not enough functionality exists to be worth a formal test procedure.

## ES2015 or ES6 Usage

To access the ES2015/ES6 version from an import statement,
download `./src/js/fusionApi.js`, and put it in your path.

Then add the following to the module where you want to use it:

```javascript
import fdpaResolutions from 'fdpa/fusionApi.js';
```

The resolutions API can now be accessed within that module
as properties of the local variable `fdpaResolutions`.

## ES5 Usage

To access an ES5 version of fusionApi.js from a script tag,
download `./distribution/fusionApi_es5.js` and reference it
in the src attribute in the page HTML:

```javascript
<script src="./PATH/fusionApi_es5.js"></script>
```

The resolutions API can now be accessed via the global variable
`fdpaResolutions`.

## fdpaResolutions methods

```javascript
function getResolutionsCount(options)
```
where `options` is of the form:
```javascript
{
    fusiontable: optional string, // the ID of the google fusiontable
    googleApiKey: required string, // the API key created in the
        // Google developers console for the FDPA Resolutions project
    statusSought: optional string, // -, inWork, materialsSent, passed, or
        // refusedOrOther
    successHandler: required function // called when a count is available
}
```
and the `successHandler` is defined by the caller to take one argument,
where the argument is an integer representing the count.

## Build from Source

To build the ES5 distribution:
1. Clone the source
2. npm install
3. npm run build

npx webpack --config --output-library webpack.distribution.config.js

The result will be the creation of ./distribution/fusionApi.js.

To build the test harness:
1. Clone the source
2. npm install
3. Edit harness/app.js and change the API key
4. npm run test
5. Follow the instructions at the end of the npm run test output

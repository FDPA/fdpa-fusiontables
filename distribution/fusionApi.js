/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResolutionsCount", function() { return getResolutionsCount; });

/* jshint browser: true */
/* jshint esversion: 6 */

var validStatus = {
    '-': '-',
    inWork: 'In work',
    materialsSent: 'Materials sent',
    passed: 'Passed',
    refusedOrOther: 'Refused/other'
};

function getResolutionsCount(options) {
    var fusiontable = options.fusiontable ||
        '10Uc_t_dBYUV_K_j6HdCMSgLXGs94bXvunQBGDOjF';
    if (!options.googleApiKey) {
        throw 'getting the resolutions count requires an API key';
    }
    var googleApiKey = options.googleApiKey;
    var statusSought = options.status || '-';
    if (!(statusSought in validStatus)) {
        throw 'can only get resolutions count for status of ' +
            '-, inWork, materialsSent, passed, or refusedOrOther';
    }
    var successHandler = options.successHandler || function() {};
    makeResolutionsCountRequest(statusSought, fusiontable, googleApiKey,
            function() {
                var response = JSON.parse(this.responseText);
                successHandler(response.rows[0][0]);
            });
}

function makeResolutionsCountRequest(statusSought, fusiontable, googleApiKey,
        successHandler) {
    var request = new XMLHttpRequest();
    var uri = 'https://www.googleapis.com/fusiontables/v2/query' +
        '?' +
        'sql=' +
        'SELECT COUNT(Status) FROM ' + fusiontable +
        " WHERE 'Status' IN '" + validStatus[statusSought] + "'" +
        '&' +
        'key=' + googleApiKey;
    request.addEventListener('load', successHandler);
    request.open('GET', encodeURI(uri));
    request.send();
}

/* harmony default export */ __webpack_exports__["default"] = ({
    'getResolutionsCount': getResolutionsCount
});




/***/ })
/******/ ]);
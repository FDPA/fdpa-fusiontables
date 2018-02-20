"use strict";
/* jshint browser: true */
/* jshint esversion: 6 */

import fdpa from 'fdpa/fusionApi.js';

fdpa.getPassedResolutionsCount();

function start() {
//    var fusionApiAdata = {
//        fusiontable: '10Uc_t_dBYUV_K_j6HdCMSgLXGs94bXvunQBGDOjF',
//        googleApiKey: 'AIzaSyDFtlZBiU0ZzSrotn4WnPTjWg9g33EZ5Po'
//    };

    console.log('start');
    var elems = {
        passed: document.getElementById('passed'),
        inWork: document.getElementById('in-work')
    };
    console.log('passed elem is ' + elems.passed.innerHTML);
}
window.addEventListener('load', start, false);

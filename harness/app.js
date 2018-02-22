"use strict";
/* jshint browser: true */
/* jshint esversion: 6 */

import fdpaResolutions from 'fdpa/fusionApi.js';

['passed', 'inWork'].forEach(function(statusSought) {
    fdpaResolutions.getResolutionsCount({
        status: statusSought,
        fusiontable: '10Uc_t_dBYUV_K_j6HdCMSgLXGs94bXvunQBGDOjF',
        // Developers: Substitute your API key here.
        googleApiKey: 'AIzaSyBz3CQw1aK0S9UHwxKq-YZtIeqdcOby-Jc',
        successHandler: function() {
            var elems = getStatusElements(statusSought);
            if (elems.length) {
                getDisplayFunc(statusSought, this.responseText, elems)();
            } else {
                window.addEventListener('load',
                        getDisplayFunc(statusSought, this.responseText), true);
            }
        }
    });
});

function getDisplayFunc(statusSought, responseText, elements) {
    return function() {
        var response = JSON.parse(responseText);
        var elems = elements || document.querySelectorAll(
                '[data-status="' + statusSought + '"]');
        elems.forEach(function(el) {
            el.innerHTML = response.rows[0][0];
        });
    };
}

function getStatusElements(statusSought) {
    return document.querySelectorAll('[data-status="' + statusSought + '"]');
}

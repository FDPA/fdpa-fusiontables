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
        successHandler: function(count) {
            var elems = getStatusElements(statusSought);
            if (elems.length) {
                getDisplayFunc(statusSought, count, elems)();
            } else {
                window.addEventListener('load',
                        getDisplayFunc(statusSought, count), true);
            }
        }
    });
});

function getDisplayFunc(statusSought, count, elements) {
    return function() {
        var elems = elements || getStatusElements(statusSought);
        elems.forEach(function(el) {
            el.innerHTML = '' + count;
        });
    };
}

function getStatusElements(statusSought) {
    return document.querySelectorAll('[data-status="' + statusSought + '"]');
}

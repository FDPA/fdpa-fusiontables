"use strict";
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
            successHandler);
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

export default {
    'getResolutionsCount': getResolutionsCount
};

export { getResolutionsCount };

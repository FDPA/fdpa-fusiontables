"use strict";
/* jshint browser: true */
/* jshint esversion: 6 */

/*** public interface ***/

var validStatus = {
    '-': '-',
    inWork: 'In work',
    materialsSent: 'Materials sent',
    passed: 'Passed',
    refusedOrOther: 'Refused/other'
};

/*
 * getResolutionsCount(options)
 * returns {
 *    verified: boolean, true means the request was submitted
 *    errorFields: array, lists fields that failed if verified is false
 *    googleApiKey: options.googleApiKey or an error message
 *    fusionTable: options.fusionTable or a sensible default
 *    statusSought: an array of status strings derived from options.status,
 *      or an error message
 * }
 * options = {
 *    googleApiKey: required string,
 *    fusiontable: optional string, defaults to the expected table
 *    status: optional string, defaults to '-'
 *    successHandler: optional function, defaults to an empty function
 * }
 * where:
 * - googleApiKey is an API key created in the Google developers console
 *   for the FDPA Resolutions project.
 * - fusiontable is the ID of a Google fusiontable for the
 *   FDPA Resolutions project.
 * - status may be '-', 'inWork', 'materialsSent', 'passed',
 *   'refusedOrOther', or a combination of these separated by a comma
 *   and no space.
 * - successHandler function has the prototype `function(count)`,
 *   where `count` is an integer returned from the query.
 */
function getResolutionsCount(options) {
    var verification = verifyResolutionCountOptions(options);
    if (verification.verified !== true) {
        return verification;
    }
    makeResolutionsCountRequest(verification.statusSought,
            verification.fusiontable, verification.googleApiKey,
            function() {
                var response = JSON.parse(this.responseText);
                verification.successHandler(response.rows[0][0]);
            });
    return verification;
}

/*** private support functions ***/

function verifyResolutionCountOptions(options) {
    var verification = {
        verified: true,
        errorFields: [],
        fusiontable: options.fusiontable ||
            '10Uc_t_dBYUV_K_j6HdCMSgLXGs94bXvunQBGDOjF',
        googleApiKey: options.googleApiKey,
        statusSought: options.status || '-',
        successHandler: options.successHandler || function() {}
    };
    if (!options.googleApiKey) {
        verification.googleApiKey = 'getting the resolutions count requires an API key';
        verification.errorFields.push('googleApiKey');
        verification.verified = false;
    }
    var invalidStrings = [];
    verification.statusSought = verification.statusSought.split(',');
    verification.statusSought.forEach(function(statusKey) {
        if (!(statusKey in validStatus)) {
            invalidStrings.push(statusKey);
        }
    });
    if (0 < invalidStrings.length) {
        verification.statusSought = invalidStrings.join(', ') +
                'not among valid status keys of ' +
                '-, inWork, materialsSent, passed, or refusedOrOther';
        verification.errorFields.push('statusSought');
        verification.verified = false;
    }

    return verification;
}

function makeResolutionsCountRequest(statusSought, fusiontable, googleApiKey,
        successHandler) {
    var request = new XMLHttpRequest();
    var uri = 'https://www.googleapis.com/fusiontables/v2/query' +
        '?' +
        'sql=' +
        'SELECT COUNT(Status) FROM ' + fusiontable +
        " WHERE 'Status' IN " + constructInCondition(statusSought) +
        '&' +
        'key=' + googleApiKey;
    request.addEventListener('load', successHandler);
    request.open('GET', encodeURI(uri));
    request.send();
}

function constructInCondition(statusArray) {
    var quoted = statusArray.map(function(statusSought) {
        return "'" + validStatus[statusSought] + "'";
    });
    if (1 === quoted.length) {
        return quoted[0];
    } else {
        return '(' + quoted.join(',') + ')';
    }
}

/*** ES6 export ***/

export default {
    'getResolutionsCount': getResolutionsCount
};

export { getResolutionsCount };

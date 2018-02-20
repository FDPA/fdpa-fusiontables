"use strict";
/* jshint esversion: 6 */
console.log('read fusionApi module');

function getPassedResolutionsCount() {
    console.log('called getPassedResolutionsCount');
}

export default {
    'getPassedResolutionsCount': getPassedResolutionsCount
};

export { getPassedResolutionsCount };

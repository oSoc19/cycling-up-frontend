// -------------------------------------------------------------------
// Dependencies

// Import


// Mine

import ServiceMap from './service-map';

// -------------------------------------------------------------------
// Properties

const translations = require('../../../assets/i18n/services.json');
const isActive = false;



// -------------------------------------------------------------------
// Exports


/**
 * Load the page with the necessary content (map, chart, ...)
 */
export function init() {
  ServiceMap.showMap()
}


/**
 *
 * @param {string} lang  - The language selected
 * @param {Object} translations - The translations data for the current page
 */
export function changeLanguage(lang, translations){

}

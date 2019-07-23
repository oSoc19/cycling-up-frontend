// -------------------------------------------------------------------
// Dependencies

// Import


// Mine

import * as ServiceMap from './service-map';

// -------------------------------------------------------------------
// Properties

const translations = require('../../../assets/i18n/services.json');


// -------------------------------------------------------------------
// Exports

export const name = "evolution";

export const isActive = () => document.getElementById('services') != null;


/**
 * Load the page with the necessary content (map, chart, ...)
 */
export function init(callback) {
  if (isActive()) {
    const mapContainer = document.getElementById('map')
    ServiceMap.showMap(mapContainer);

    if (callback) {
      return callback(translations)
    }
  }
}


/**
 *
 * @param {string} lang  - The language selected
 */
export function changeLanguage(lang){
  ServiceMap.onChangeLanguage(translations)
}

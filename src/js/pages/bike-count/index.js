// -------------------------------------------------------------------
// Dependencies

// Import

// Mine
 import BikeMap from "./bike-map";
import VilloRentalChart from "./villo-rental-chart";


// -------------------------------------------------------------------
// Properties
const translations = require('../../../assets/i18n/bike-count.json'),
const isActive = false;




// -------------------------------------------------------------------
// Exports

export const name = "bike-count";


/**
 * Load the page with the necessary content (map, chart, ...)
 */
export function init() {
  isActive = BikeMap.showMap();
  isActive = isActive | VilloRentalChart.showChart();
}


/**
 *
 * @param {string} lang  - The language selected
 * @param {Object} translations - The translations data for the current page
 */
export function changeLanguage(lang){
  BikeMap.onChangeLanguage(lang, translations);
  VilloRentalChart.onChangeLanguage(lang. translations);
}

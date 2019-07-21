// -------------------------------------------------------------------
// Dependencies

// Import

// Mine
//  import HistoricalMap from "./historical-map";
 import VilloRentalChart from "./villo-rental-chart";


// -------------------------------------------------------------------
// Properties
const translations = require('../../../assets/i18n/villo.json');
const isActive = false;




// -------------------------------------------------------------------
// Exports

export const name = "villo";


/**
 * Load the page with the necessary content (map, chart, ...)
 */
export function init() {
  // isActive = HistoricalMap.showMap();
  isActive = isActive | VilloRentalChart.showChart();
}


/**
 *
 * @param {string} lang  - The language selected
 * @param {Object} translations - The translations data for the current page
 */
export function changeLanguage(lang){
  // HistoricalMap.onChangeLanguage(lang, translations);
  VilloRentalChart.onChangeLanguage(lang. translations);
}

// -------------------------------------------------------------------
// Dependencies

// Import

// Mine
 import HistoricalMap from "./historical-map";
 import KmEvolutionChart from "./km-evolution-chart";


// -------------------------------------------------------------------
// Properties
const translations = require('../../../assets/i18n/historical-map.json');
const isActive = false;




// -------------------------------------------------------------------
// Exports

export const name = "evolution";


/**
 * Load the page with the necessary content (map, chart, ...)
 */
export function init() {
  isActive = HistoricalMap.showMap();
  isActive = isActive | KmEvolutionChart.showChart();
}


/**
 *
 * @param {string} lang  - The language selected
 * @param {Object} translations - The translations data for the current page
 */
export function changeLanguage(lang){
  HistoricalMap.onChangeLanguage(lang, translations);
  KmEvolutionChart.onChangeLanguage(lang. translations);
}

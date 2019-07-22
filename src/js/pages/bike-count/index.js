// -------------------------------------------------------------------
// Dependencies

// Import

// Mine
 import * as BikeMap from "./bike-map";
// import * as VilloRentalChart from "./villo-rental-chart";


// -------------------------------------------------------------------
// Properties
const translations = require('../../../assets/i18n/bike-count.json');




// -------------------------------------------------------------------
// Exports

export const name = "bike-count";

export const isActive = () => document.getElementById('bike-count') != null;


/**
 * Load the page with the necessary content (map, chart, ...)
 */
export function init() {

  if (isActive()) {
    const mapContainer = document.getElementById('js-map-bike');
    BikeMap.showMap(mapContainer, (id, name) => console.log(id, name));

    const chartContainer =  document.getElementById(`js-canvas-evolution`);
    KmEvolutionChart.showChart(chartContainer);

    if (callback) {
      return callback(translations)
    }
  }
}


/**
 *
 * @param {string} lang  - The language selected
 * @param {Object} translations - The translations data for the current page
 */
export function changeLanguage(lang){
  BikeMap.onChangeLanguage(translations);
  // VilloRentalChart.onChangeLanguage(lang. translations);
}

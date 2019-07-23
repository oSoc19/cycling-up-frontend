// -------------------------------------------------------------------
// Dependencies

// Import

// Mine
 import * as VilloLiveCount from "./villo-live-count";
 import * as VilloRentalChart from "./villo-rental-chart";


// -------------------------------------------------------------------
// Properties
const translations = require('../../../assets/i18n/villo.json');




// -------------------------------------------------------------------
// Exports

export const name = "villo";

export const isActive = () => document.getElementById('villo') != null;


/**
 * Load the page with the necessary content (map, chart, ...)
 */
export function init(callback) {
  if (isActive()) {
    const mapContainer = document.querySelector(`.js-map-villo`);
    VilloLiveCount.showMap(mapContainer);

    const chartContainer =  document.getElementById('js-canvas-villo');
    VilloRentalChart.init(chartContainer);

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
  // HistoricalMap.onChangeLanguage(lang, translations);
  VilloRentalChart.onChangeLanguage(translations['graph_legend'][lang]);
}

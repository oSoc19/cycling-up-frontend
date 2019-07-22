// -------------------------------------------------------------------
// Dependencies

// Import

// Mine
 import * as BikeMap from "./bike-map";
 import * as BikeCountPerSeasonChart from "./bike-count-season-chart";
 import * as BikeCountPerYearChart from "./bike-count-per-year-chart";


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
    BikeMap.showMap(mapContainer, BikeCountPerSeasonChart.onSelectedBikeStation);

    const chartContainer =  document.getElementById(`js-canvas-season`);
    // BikeCountPerYearChart.showChart(chartContainer);

    BikeCountPerSeasonChart.showChart(chartContainer);

    if (callback) {
      return callback(translations)
    }
  }
}


/**
 *
 * @param {string} lang  - The language selected
 * @param {Object} translations - The translations data for BikeCountPerYearChartcurrent page
 */
export function changeLanguage(lang){
  BikeMap.onChangeLanguage(translations);
  BikeCountPerYearChart.onChangeLanguage(translations);
  BikeCountPerSeasonChart.onChangeLanguage(translations);
}

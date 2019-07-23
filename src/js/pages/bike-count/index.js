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
export function init(callback) {

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
 */
export function changeLanguage(lang){
  const legend = translations['graph_legend'][lang].split(';')
  const [jan, may, sep, nov] = legend;

  BikeCountPerSeasonChart.onChangeLanguage({
    labels : {jan,may,sep,nov},
    title : translations['graph_title'][lang]
  });
  BikeCountPerYearChart.onChangeLanguage(translations);
}

// -------------------------------------------------------------------
// Dependencies

// Import

// Mine
import * as CommuteChart from './commute-to-work-chart';


// -------------------------------------------------------------------
// Properties

const translations = require('../../../assets/i18n/commute.json');



// -------------------------------------------------------------------
// Exports

export const name = "commute";

export const isActive = () => document.getElementById('commute') != null;


/**
 * Load the page with the necessary content (map, chart, ...)
 */
export function init(callback) {
  if (isActive()) {
    const chartContainer = document.getElementById(`js-canvas-commute`)
    CommuteChart.init(chartContainer);

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
  CommuteChart.onChangeLanguage(translations['graph_legend'][lang])
}

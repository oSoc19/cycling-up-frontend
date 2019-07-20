// -------------------------------------------------------------------
// Dependencies

// Import

// Mine
import CommuteChart from './commute-to-work-chart';


// -------------------------------------------------------------------
// Properties

const translations = require('../../../assets/i18n/commute.json'),
const isActive = false;



// -------------------------------------------------------------------
// Exports

export const name = "commute";


/**
 * Load the page with the necessary content (map, chart, ...)
 */
export function init() {
  CommuteChart.showChart();
}


/**
 *
 * @param {string} lang  - The language selected
 * @param {Object} translations - The translations data for the current page
 */
export function changeLanguage(lang){

}

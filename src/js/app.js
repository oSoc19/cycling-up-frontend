import * as Evolution from './module/km-evolution';
import * as Commute from './module/commute-to-work';
import * as VilloRental from './module/villo-rental';
import * as BikeSeasonCount from './module/bike-count-season';
import * as BikeYearlyCount from './module/bike-count-per-year';
import * as HistoricalMap from './module/historical-map';
import * as ServiceMap from './module/service-map';
import * as BikeMap from './module/bike-map';
import * as VilloMap from './module/live-villo-count';
//import liveDataCount from './module/live-data-count';

import * as Translation from './module/translation.js';

let $navDestinationTargets, $mobileMenu, main;

const getDomElements = () => {
  $navDestinationTargets = document.querySelectorAll('.js-toggle-menu');
  main = document.querySelector('main');
  $mobileMenu = document.querySelector('.l-header__toggle');
  $mobileMenu.addEventListener('click', onHandlerMenuClick);
  $('.lang_selector').click(onLangSelectorClick);
};

const init = function() {
  getDomElements();

  Translation.init()

  Commute.init();
  Evolution.init();
  VilloRental.init();
  BikeSeasonCount.init();
  BikeYearlyCount.init();
  // liveDataCount();

  const $bikeMap = document.querySelector(`.js-map-bike`);
  if ($bikeMap) {
    BikeMap($bikeMap);
  }

  const $serviceMap = document.querySelector(`.js-map-service`);
  if ($serviceMap) {
    ServiceMap.init({ctx : $serviceMap});
  }

  const $historicalMap = document.querySelector(`.js-map-historical`);
  if ($historicalMap) {
    HistoricalMap($historicalMap);
  }

  const $villoMap = document.querySelector(`.js-map-villo`);
  if ($villoMap) {
    VilloMap($villoMap);
  }
};

function updateChartLanguage(err, lang, translation) {
  [
    Commute.onChangeLanguage,
    Evolution.onChangeLanguage,
    VilloRental.onChangeLanguage,
    BikeSeasonCount.onChangeLanguage,
    BikeYearlyCount.onChangeLanguage,
    ServiceMap.onChangeLanguage,
  ]
  .forEach(changeLangFn => {
    changeLangFn.call(null, lang, translation)
  });

}





const onHandlerMenuClick = () => {
  $navDestinationTargets.forEach(element => {
    console.log(element);

    element.classList.toggle('is-active');

    if (element.classList.contains('is-active')) {
      main.classList.add('disable-scroll');
    } else {
      main.classList.remove('disable-scroll');
    }
  });
};


/**
 * Handle click on the language selection button
 * @param {*} ev - Click event
 */
const onLangSelectorClick = function(ev) {
  ev.preventDefault();

  const $this = $(this)
  const lang = $this.attr('data-value');

  $('.lang_selector.active').removeClass('active');
  $this.addClass('active')

  const path = window.location.pathname.substr(1).slice(0, -5);

  console.log(lang, path);

  Translation.updateLang(path, lang, updateChartLanguage);

}


document.addEventListener('DOMContentLoaded', () => {
  console.info('DOM loaded');
  init();
});

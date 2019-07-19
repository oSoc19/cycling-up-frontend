// import * as Evolution from './module/km-evolution';
import * as Commute from './module/commute-to-work';
import Villo from './module/villo-rental';
import Season from './module/bike-count-season';
import Count from './module/bike-count-per-year';
import HistoricalMap from './module/historical-map';
import ServiceMap from './module/service_map';
import BikeMap from './module/bike-map';
import VilloMap from './module/live-villo-count';
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
  // Evolution();

  Villo();
  Season();
  Count();
  // liveDataCount();

  const $bikeMap = document.querySelector(`.js-map-bike`);
  if ($bikeMap) {
    BikeMap($bikeMap);
  }

  const $serviceMap = document.querySelector(`.js-map-service`);
  if ($serviceMap) {
    ServiceMap($serviceMap);
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

document.addEventListener('DOMContentLoaded', () => {
  console.info('DOM loaded');
  init();
});

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

const onLangSelectorClick = function(ev) {
  const $this = $(this)
  const lang = $this.attr('data-value');

  $('.lang_selector.active').removeClass('active');
  $this.addClass('active')

  const path = window.location.pathname.substr(1).slice(0, -5);

  console.log(lang, path);

  Translation.updateLang(path, lang)
  ev.preventDefault();
}

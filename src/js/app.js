import evolution from './module/km-evolution';
import commute from './module/commute-to-work';
import villo from './module/villo-rental';
import season from './module/bike-count-season';
import count from './module/bike-count-per-year';

import historicalMap from './module/historical-map';
import serviceMap from './module/service_map';
import bikeMap from './module/bike-map';
import liveDataCount from './module/live-data-count';

import './jquery.translate.js';
import './module/translation.js';

let $navDestinationTargets, $mobileMenu, main;

const getDomElements = () => {
  $navDestinationTargets = document.querySelectorAll('.js-toggle-menu');
  main = document.querySelector('main');
  $mobileMenu = document.querySelector('.l-header__toggle');
  $mobileMenu.addEventListener('click', onHandlerMenuClick);
};

const init = function() {
  getDomElements();
  commute();
  evolution();

  villo();
  season();
  count();
  liveDataCount();

  const $serviceMap = document.querySelector(`.js-map-service`);
  if ($serviceMap) {
    serviceMap($serviceMap);
  }

  const $bikeMap = document.querySelector(`.js-map-bike`);
  if ($bikeMap) {
    bikeMap($bikeMap);
  }

  const $historicalMap = document.querySelector(`.js-map-historical`);
  if ($historicalMap) {
    historicalMap($historicalMap);
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


// const elem = document.querySelector('input[type="range"]');

// const rangeValue = () => {
//   const value = elem.value;
//   console.log(value);
//   // const test = (elem.value - 1896) * 2.9;
//   // document.querySelector('.c-slider').style.boxShadow =  `inset ${test}px 0 0 #2D3E71`;
// };

// elem.addEventListener('input', rangeValue);

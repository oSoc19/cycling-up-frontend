import evolution from './module/km-evolution';
import commute from './module/commute-to-work';
import historicalMap from './module/historical-map';

import './jquery.translate.js';
import './module/translation.js';

let $navDestinationTargets, $mobileMenu, main;

const getDomElements = () => {
  $navDestinationTargets = document.querySelectorAll('.js-toggle-menu');
  main = document.querySelector('main');
  $mobileMenu = document.querySelector('.l-header__toggle');
  $mobileMenu.addEventListener('click', onHandlerMenuClick);
};

const init = function () {
  getDomElements();
  commute();
  evolution();

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

import * as Translation from './module/translation.js';

import EvolutionPage from "./pages/evolution";
import CommutePage from "./pages/commute";
import ServicePage from "./pages/services";
import VilloPage from "./pages/villo"
import BikeCountPage from "./pages/bike-count"


const pages = [
  EvolutionPage,
  CommutePage,
  ServicePage,
  VilloPage,
  BikeCountPage
]

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

  Translation.init();

  pages.forEach(page => {
    if (Object.hasOwnProperty('init') && typeof page['init'] === 'function') {
      page.init.call(page)
    }
  })

  // Commute.init();
  // Evolution.init();
  // VilloRental.init();
  // BikeSeasonCount.init();
  // BikeYearlyCount.init();
  // // liveDataCount();

  // const $bikeMap = document.querySelector(`.js-map-bike`);
  // if ($bikeMap) {
  //   BikeMap.init({ctx:$bikeMap});
  // }

  // const $serviceMap = document.querySelector(`.js-map-service`);
  // if ($serviceMap) {
  //   ServiceMap.init({ctx : $serviceMap});
  // }

  // const $historicalMap = document.querySelector(`.js-map-historical`);
  // if ($historicalMap) {
  //   HistoricalMap.init({ctx: $historicalMap});
  // }

  // const $villoMap = document.querySelector(`.js-map-villo`);
  // if ($villoMap) {
  //   VilloMap.init({ctx: $villoMap});
  // }
};

function updateChartLanguage(err, lang, translation) {
  // [
  //   Commute.onChangeLanguage,
  //   Evolution.onChangeLanguage,
  //   VilloRental.onChangeLanguage,
  //   BikeSeasonCount.onChangeLanguage,
  //   BikeYearlyCount.onChangeLanguage,
  //   ServiceMap.onChangeLanguage,
  // ]
  // .forEach(changeLangFn => {
  //   changeLangFn.call(null, lang, translation)
  // });

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

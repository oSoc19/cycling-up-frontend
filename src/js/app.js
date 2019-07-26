import * as Translation from './module/translation.js';

import * as EvolutionPage from "./pages/evolution";
import * as CommutePage from "./pages/commute";
import * as ServicePage from "./pages/services";
import * as VilloPage from "./pages/villo"
import * as BikeCountPage from "./pages/bike-count"

const navigationTranslation = require('../assets/i18n/_navigation.json');


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

  const navItems = document.getElementsByClassName('l-navigation__list__item');
  Array.from(navItems).forEach(item => {
    item.addEventListener('click', e => {
      let link = null;
      if (e.target.localName == 'img') {
        link = e.target.nextElementSibling;
      } else {
        link = e.target.children[1];
      }
      link.click()
    }, false)
  });


};

const init = function () {
  getDomElements();

  const previousLang = localStorage.getItem('lang-selected')
  $(`.lang_selector[data-value=${previousLang}]`).addClass('active')

  Translation.init({
    lang : previousLang
  });

  Translation.addTranslation('_navigation', navigationTranslation)

  for (const page of pages) {
    if (page.hasOwnProperty('changeLanguage') && typeof page['changeLanguage'] === 'function') {
      Translation.subscribe(page.changeLanguage, page);
    } else {
      throw new Error (`'${page} must export a function changeLanguage()'`);
    }

    if (page.hasOwnProperty('init') && typeof page['init'] === 'function') {
      page.init.call(page, (trans) => {
        Translation.addTranslation('active', trans)

      });
    } else {
      throw new Error (`'${page} must export a function init()'`);
    }
  }


  if (previousLang !== 'en') {
    Translation.updateLang(previousLang);
    Translation.notifyAll(previousLang);
  }

};


const onHandlerMenuClick = () => {
  $navDestinationTargets.forEach(element => {

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
const onLangSelectorClick = function (ev) {
  ev.preventDefault();

  const $this = $(this);
  const lang = $this.attr('data-value');

  $('.lang_selector.active').removeClass('active');
  $this.addClass('active');

  localStorage.setItem('lang-selected', lang);

  Translation.updateLang(lang);
  Translation.notifyAll(lang)
}

document.addEventListener('DOMContentLoaded', () => {
  init();

  // Make the current navigation link active
  const path = window.location.pathname.substr(1).slice(0, -5);
  $(`.l-navigation__list__item > a[href*="${path}"]`)
    .parent()
    .addClass('is-current');
});

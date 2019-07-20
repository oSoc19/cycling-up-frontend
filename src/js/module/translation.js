import './jquery.translate';


/**
 * Translations data container grouped by the slide name in
 * browser location URL path without the heading '/'.
 * This URL path will be used to identify the current slide page.
 */
const translations = {
  // NOTE: Dynamic import with the assetsDir variable does not work
  _navigation: require('../../assets/i18n/_navigation.json'),
  'historical-map': require('../../assets/i18n/historical-map.json'),
    commute: require('../../assets/i18n/commute.json'),
    services: require('../../assets/i18n/services.json'),
    villo: require('../../assets/i18n/villo.json'),
    'bike-count': require('../../assets/i18n/bike-count.json')
  };

let instance;

const observers = [];


export function init(params) {
  instance = $('body').translation({ lang: 'en', t: translations });
  return [instance, Object.keys(translations)]
}


export function updateLang(slide_path, lang = "en", callbackFn) {
  if (!instance) {
    throw new Error("Translation not initialized");
  }

  if (!slide_path) {
    slide_path = window.location.pathname.substr(1).slice(0, -5);
  }

  instance.lang('_navigation', lang);
  instance.lang(slide_path, lang);

  return callbackFn(null, lang, translations[slide_path])
}

export function subscribe(callbackFn) {
  observers.push(callbackFn)
}

export function unsubscribe(callbackFn) {
  observers = observers.filter(fn => fn !== callbackFn);
}

export function notifyAll(lang, translation) {
  for (const subject of observers) {
    subject(lang, translation)
  }
}

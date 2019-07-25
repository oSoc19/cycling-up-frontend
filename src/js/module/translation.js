import './jquery.translate';


/**
 * Translations data container grouped by the slide name in
 * browser location URL path without the heading '/'.
 * This URL path will be used to identify the current slide page.
 */
// const translations = {
//   // NOTE: Dynamic import with the assetsDir variable does not work
//   _navigation: require('../../assets/i18n/_navigation.json'),
//   'historical-map': require('../../assets/i18n/historical-map.json'),
//     commute: require('../../assets/i18n/commute.json'),
//     services: require('../../assets/i18n/services.json'),
//     villo: require('../../assets/i18n/villo.json'),
//     'bike-count': require('../../assets/i18n/bike-count.json')
//   };

let instance;

const observers = [];


export function init(params) {
  const lang = params['lang'] | 'en';
  instance = $('body').translation({ lang   });
  return instance
}


export function addTranslation(name="active", translation) {
  instance.add(name, translation)
}


export function updateLang(lang = "en", callbackFn) {
  if (!instance) {
    throw new Error("Translation not initialized");
  }

  instance.lang('_navigation', lang);
  instance.lang("active", lang);

  if (callbackFn){
    return callbackFn(null, lang)
  }
}



export function subscribe(callbackFn, context) {
  observers.push([callbackFn, context])
}

export function unsubscribe(callbackFn) {
  observers = observers.filter(fn => fn !== callbackFn);
}

export function notifyAll(lang) {
  for (const [subject, context] of observers) {
    subject.call(context, lang)
  }
}

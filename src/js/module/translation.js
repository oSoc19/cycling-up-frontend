import './jquery.translate.js';


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


export function init(params) {
  instance = $('body').translation({ lang: 'en', t: translations });
  return [instance, Object.keys(translations)]
}


export function updateLang(slide_path, lang = "en") {
  if (!instance) {
    throw new Error("Translation not initialized");
  }

  if (!slide_path) {
    slide_path = window.location.pathname.substr(1).slice(0, -5);
  }

  instance.lang('_navigation', lang);
  instance.lang(slide_path, lang);

  return instance.get(slide_path)
}

// $(function() {


//   $('.lang_selector').click(function(ev) {
//     const $this = $(this)
//     const lang = $this.attr('data-value');

//     $('.lang_selector.active').removeClass('active');
//     $this.addClass('active')


//     const

//     console.log(lang, path);


//     ev.preventDefault();
//   });
// });



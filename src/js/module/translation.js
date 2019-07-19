$(function() {
  const assetsDir = '../../assets/i18n/';

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

  const _t = $('body').translation({ lang: 'en', t: translations });

  // _t.lang('_navigation', "en");

  $('.lang_selector').click(function(ev) {
    const $this = $(this)
    const lang = $this.attr('data-value');

    $('.lang_selector.active').removeClass('active');
    $this.addClass('active')


    const path = window.location.pathname.substr(1).slice(0, -5);

    console.log(lang, path);

    _t.lang('_navigation', lang);
    _t.lang(path, lang);

    ev.preventDefault();
  });
});

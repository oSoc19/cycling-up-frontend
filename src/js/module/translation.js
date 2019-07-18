$(function() {
  const assetDir = './.../assets/i18n/';
  /**
   * Translations data container grouped by the slide name in
   * browser location URL path without the heading '/'.
   * This URL path will be used to identify the current slide page.
   */
  const translations = {
    _navigation: require(assetDir + '_navigation.json'),
    'historical-map': require(assetDir + 'historical-map.json'),
    commute: require(assetDir + 'commute.json'),
    services: require(assetDir + 'services.json'),
    villo: require(assetDir + 'villo.json'),
    'bike-count': require(assetDir + 'bike-count.json')
  };

  const _t = $('body').translate({ lang: 'en', t: translations });

  $('.lang_selector').click(function(ev) {
    const lang = $(this).attr('data-value');

    const path = window.location.pathname.substr(1).slice(0, -5);

    console.log(lang, path);

    _t.lang('_navigation', lang);
    _t.lang(path, lang);

    ev.preventDefault();
  });
});

/**
 * @file jquery.translate.js
 * @brief jQuery plugin to translate text in the client side.
 * @author Manuel Fernandes
 * @site
 * @version 0.9
 * @license MIT license <http://www.opensource.org/licenses/MIT>
 *
 * translate.js is a jQuery plugin to translate text in the client side.
 *
 */

(function($){
  $.fn.translate = function(options) {

    var that = this; //a reference to ourselves

    var settings = {
      css: "i18n", // trn
      lang: "en",
      currentSlide : "index"
    };
    settings = $.extend(settings, options || {});
    if (settings.css.lastIndexOf(".", 0) !== 0)   //doesn't start with '.'
      settings.css = "." + settings.css;

    var translations = settings.t;

    //public methods
    this.lang = function(slide, l) {
      if (l) {
        settings.lang = l;
        settings.currentSlide = slide;
        this.translate(settings);  //translate everything
      }

      return settings.lang;
    };


    this.get = function(slide, part) {
      var res = part;

      try {
        res = translations[slide][part][settings.lang];
      }
      catch (err) {
        //not found, return index
        return part;
      }

      if (res)
        return res;
      else
        return part;
    };

    this.g = this.get;



    //main
    this.find(settings.css).each(function(i) {
      var $this = $(this);

      var i18n_key = $this.attr("data-i18n-key");
      if (!i18n_key) {
        i18n_key = $this.html();
        $this.attr("data-i18n-key", i18n_key);   //store key for next time
      }

      $this.html(that.get(settings.currentSlide, i18n_key));
    });


		return this;



  };
})(jQuery);

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
  $.fn.translation = function(options) {

    // var that = this; //a reference to ourselves

    var _default_opts = {
      css: "i18n", // trn
      lang: "en",
      t : {},
    };

    const settings = $.extend(_default_opts, options || {});

    if (settings.css.lastIndexOf(".", 0) !== 0)   //doesn't start with '.'
      settings.css = "." + settings.css;

    var translations = settings.t;

    //public methods
    this.lang = function(slide, l) {
      if (l) {
        settings.lang = l;
        this.translate(slide, settings);  //translate everything
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
        return null;
      }

      return (res) ? res : null ;
    };

    this.add = function (key, translation) {
      translations[key] = translation;
    }


    //main
    this.translate = (slide) => {

      this.find(settings.css).each((i, element) => {
        var $this = $(element);

        var i18n_key = $this.attr("data-i18n-key");

        if (i18n_key) {
          const trans = this.get(slide, i18n_key)
          if(trans) {
            $this.html(trans);
          }
        } else {
          // i18n_key = $this.html();
          // $this.attr("data-i18n-key", i18n_key);   //store key for next time
        }

      });

    }


		return this;



  };
})(jQuery);

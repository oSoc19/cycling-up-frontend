$(function() {

  var t = {
    testTitle: {
      eng: '<span class="h1-title">How many people ride</span> <br /><span class="h1-title">their bike to work?</span>',
      fr: '<span class="h1-title">French</span>',
      nl: '<span class="h1-title">Dutch</span>',
    }
  };
  var _t = $('body').translate({lang: "eng", t: t});
  var str = _t.g("translate");
  console.log(str);


  $(".lang_selector").click(function(ev) {
    var lang = $(this).attr("data-value");
    _t.lang(lang);

    console.log(lang);
    ev.preventDefault();
  });
})

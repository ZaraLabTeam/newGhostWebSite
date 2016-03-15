/**
 * CSS Class aaplier
 * applyies the current window location as html class 
 * to the TARGET -> '.page.main-article' element 
 */

/*globals jQuery, document */
(function($) {
  "use strict";

  var TARGET = '.page.main-article';

  $(document).ready(function() {

    applyClassFromLocationTo(TARGET);

    function applyClassFromLocationTo(selector) {

      var currentPageName = window.location
        .pathname.match(/[^\/]*(?=\/$)/)[0];

      if (!currentPageName) return;

      var $element = $(selector);
      console.log($element);

      if (!$element) return;

      $element.addClass(currentPageName);

    }});

})(jQuery);

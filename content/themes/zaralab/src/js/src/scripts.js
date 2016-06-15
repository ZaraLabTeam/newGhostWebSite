/**
 * Main JS file
 */

/*globals jQuery, document */
(function($) {
  "use strict";

  $(document).ready(function() {

    window.scrollTo(0, 0);

    // Fit Vids
    $(".post").fitVids();


    // Tiny easing
    jQuery.extend(jQuery.easing, {

      easeInOutCirc: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
      }

    });
  });

}(jQuery));

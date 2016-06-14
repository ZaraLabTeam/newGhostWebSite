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

    // Nice and simple slide out menu
    var menu_on = false;
    var speed = 300;
    var effect = 'easeInOutCirc';

    $('.menu-link').on('click', function(e) {

      e.preventDefault();

      if (menu_on == true) {

        $('.panel').animate({
          left: '-15.625em'
        }, speed, effect);

        menu_on = false;

        $('#wrap, #bg').removeClass('fader');


      } else {

        $('.panel').delay(300).animate({
          left: '0'
        }, speed, effect);
        $('#wrap, #bg').addClass('fader');

        menu_on = true;

      }

    });


    // Show menu link if menu contains anything

    if ($('.panel ul').length >= 1 || $('.panel p').length >= 1) {

      $('.menu-link').fadeIn();

    } else {

      $('.menu-link').hide();

    }

  });

}(jQuery));

/** Side Navigation Menu - Nice and simple slide out menu */

(function ($) {
    'use strict';

    var menu_on = false;
    var speed = 300;
    var effect = 'easeInOutCirc';

    $(document).ready(function() {
        // Show menu link if menu contains anything

        if ($('.panel ul').length >= 1 || $('.panel p').length >= 1) {

            $('.menu-link').fadeIn();

        } else {

            $('.menu-link').hide();

        }

        $('.menu-link').on('click', function(e) {

            e.preventDefault();

            if (menu_on === true) {

                hideMenu();

            } else {

                showMenu();

            }
        });

        // Hides the menu if clicked outside the menu
        $(document).click(function(event) {

            if (menu_on === true &&
                !$(event.target).closest('#menu').length &&
                !$(event.target).is('#menu')) {

                // The line bellow disables activation of other items on the page if
                // you just want close the menu by clicking outside of it
                // but the cursor still turns to pointer over links and such
                // so it might not be desired
                // event.preventDefault();

                hideMenu();
            }
        });
    });

    function showMenu() {
        $('.panel').delay(300).animate({
            left: '0'
        }, speed, effect);
        $('#wrap, #bg').addClass('fader');

        menu_on = true;
    }

    function hideMenu() {
        $('.panel').animate({
            left: '-15.625em'
        }, speed, effect);

        $('#wrap, #bg').removeClass('fader');

        menu_on = false;
    }

})(jQuery);
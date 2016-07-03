/**
 * Created by kidroca on 9.6.2016 г..
 */

(function($) {
    'use strict';
    $(document).ready(function() {

        var $footer = $('.main-footer');
        var $showFooter = $('.show-footer');

        $footer.on('click', function() {
            $footer.slideToggle();
            $showFooter.fadeIn();
        });

        $showFooter.on('click', function() {
            $footer.slideToggle();
            $showFooter.fadeOut();
        });
    });

})(window.jQuery);
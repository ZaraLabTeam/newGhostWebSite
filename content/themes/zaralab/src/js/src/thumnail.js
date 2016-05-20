(function($) {
  "use strict";

  $(document).ready(function() {

    $('.post-content').children('p').addClass('description');
    $('.post-module').hover(function() {
      $(this).find('.description').stop().animate({
        height: "toggle",
        opacity: "toggle"
      }, 300);
    });

  });

})(jQuery);

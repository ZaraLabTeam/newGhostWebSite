(function($) {
  "use strict";

  $(document).ready(function() {

    $(".email-button").click(function(){
      var form = $('#form');

      $(".envelope").toggleClass("active");
      form.toggle('slow');
      $('html, body').animate({ scrollTop: form.offset().top }, 500);
    });
  });

})(jQuery);
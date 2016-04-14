(function($) {
  "use strict";

  $(document).ready(function() {

    $(".email-button").click(function(){
      $(".envelope").toggleClass("active");
      $('#form').toggle("slow");
    });

  });

})(jQuery);

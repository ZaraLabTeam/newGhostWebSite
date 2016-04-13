(function($) {
	'use strict';

	$.fn.readMore = function() {
		console.log('readmore');

		var div = $('<div class="expression" />')
			.html('<p><em>function</em> <strong>readMore</strong><span>() { </span><span class="cursor">_</span></a></p>');

		this.append(div);
	};

	$(document).on('ready', function() {
		$('.read-more').readMore();
	});

})(jQuery);
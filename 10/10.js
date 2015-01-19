// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.

(function ($) {
	$.event.special.throttledScroll = {
	  setup: function(data) {
	    var timer = 0;
	    $(this).on('scroll.throttledScroll', function(event) {
	      if (!timer) {
	        timer = setTimeout(function() {
	          $(this).triggerHandler('throttledScroll');
	          timer = 0;
	        }, 250);
	      }
	    });
	  },
	  teardown: function() {
	    $(this).off('scroll.throttledScroll');
	  }
	};
})(window.jQuery);



(function ($) {
	// fade photo details
	$(document).on('mouseenter mouseleave', 'div.photo', function(event) {
	  var $details = $(this).find('.details');
	  if (event.type == 'mouseenter') {
	    $details.fadeTo('fast', 0.7);
	  } else {
	    $details.fadeOut('fast');
	  }
	  //$details.toggleClass("entered", event.type === "mouseenter");
	});

	// ajax data
	$(document).on('nextPage', function(event, scrollToVisible) {
	  var url = $('#more-photos').attr('href');
	  if (url) {
	    $.get(url, function(data) {
	      var $data = $(data).appendTo("#gallery");

	      if (scrollToVisible) {
	      	var newTop = $data.offset().top;

	      	$(window).scrollTop(newTop);
	      }

	      checkScrollPosition();
	    });
	  }
	});

	// control page number
	var pageNum = 1;
	$(document).on('nextPage', function() {
	  pageNum++;
	  if (pageNum < 20) {
	    $('#more-photos').attr('href', 'pages/' + pageNum + '.html');
	  }else {
	    $('#more-photos').remove();
	  }
	});

	$(document).ready(function() {
	  $('#more-photos').click(function(event) {
	    event.preventDefault();
	    $(this).trigger('nextPage', [true]);
	  });
	});

	function checkScrollPosition() {
		var distance = $(window).scrollTop() + $(window).height();
		// get next page if almost to bottom
		if ($('#container').height() <= distance) {
		  $(document).trigger('nextPage');
		}
	}

	// setTimeout to check scroll
	$(window)
	  .on('throttledScroll', checkScrollPosition)
	  .trigger('scroll.throttledScroll');

	// var timer = 0;
	// $(window).scroll(function() {
	//   if (!timer) {
	//     timer = setTimeout(function() {
	//       checkScrollPosition();
	//       timer = 0;
	//     }, 250);
	//   }
	// }).trigger('scroll');

})(window.jQuery);
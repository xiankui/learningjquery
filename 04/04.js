// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.
$(function () {
	var $speech = $(".speech"),
		defaultSize = $speech.css("font-size");

	// control font-size large and small
	$("#switcher").on('click', "button", function (e) {
		e.preventDefault();

		var num = parseFloat($speech.css('font-size'));
		switch (this.id) {
			case "switcher-large":
				num *= 1.4;
				break;
			case "switcher-small":
				num /= 1.4;
				break;
			default:
				num = parseFloat(defaultSize);
		}

		$speech.animate({
			"font-size": num + "px"
		}, "slow");
	});

	// control first p hide
	var $firstPara = $("p").eq(1);
	$firstPara.hide();

	$("a.more").on("click", function (e) {
		e.preventDefault();

		$firstPara.animate({
			"height": "toggle",
			"opacity": "toggle"
		}, "slow");

		var $link = $(this);
		if ($link.text() === "read more") {
			$link.text("read less");
		} else {
			$link.text("read more");
		}
	});

	// text size label
	$('div.label').click(function() {
	  var paraWidth = $('div.speech p').outerWidth();
	  var $switcher = $(this).parent();
	  var switcherWidth = $switcher.outerWidth();
	  
	  $switcher
	    .css({position: 'relative'})
	    .fadeTo('fast', 0.1)
	    .animate({
	      left: paraWidth - switcherWidth
	    }, {
	      duration: 'slow',
	      queue: false
	    })
	    .fadeTo('slow', 1.0)
	    .slideUp('slow')
	    .queue(function(next) {
	      $switcher.css({backgroundColor: '#f00'});  // queue
	      next();  
	    })
	    .slideDown('slow');
	});

	$('p').eq(2).css('border', '1px solid #333')
				.click(function () {
					var $this = $(this);

					$this.next().slideDown("slow", function () {
						$this.slideUp();
					});
				});
	$('p').eq(3).css('backgroundColor', '#ccc').hide();
});
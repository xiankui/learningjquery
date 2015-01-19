// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.

$(document).ready(function() {

	/**
	 *  $.fx
	 *  $.fx.off = true  关闭所有动画效果
	 */

	$.fx.speeds = {
		_default: 400,
		fast: 200,
		slow: 600,
		crawl: 1200
	};

	$('#fx-toggle').show().on('click', function() {
	  $.fx.off = !$.fx.off;
	});

	var $movable = $('<div id="movable"></div>')
	  .appendTo('body');

	var bioBaseStyles = {
	      display: 'none',
	      height: '5px',
	      width: '25px'
	    },
	    bioEffects = {
	      duration: 800,
	      easing: 'easeOutQuart',
	      specialEasing: {
	        opacity: 'linear'
	      }
	    };

	function showBio() {
	  var $member = $(this).parent(),
	      $bio = $member.find('p.bio'),
	      startStyles = $.extend(bioBaseStyles, $member.offset()),
	      endStyles = {
	        width: $bio.width(),
	        top: $member.offset().top + 5,
	        left: $member.width() + $member.offset().left - 5,
	        opacity: 'show'
	      };

	  $movable
	    .html($bio.clone())
	    .css(startStyles)
	    .animate(endStyles, bioEffects)
	    .animate({height: $bio.height()}, {easing: 'easeOutQuart'});
	}

	function showDetails() {
	  var $member = $(this);
	  if ($member.hasClass('active')) {
	    return;
	  }

	  $movable.fadeOut();

	  $('div.member.active')
	    .removeClass('active')
	    .children('div').fadeOut();
	  $member.addClass('active');


	  $member.find('div').css({
	    display: 'block',
	    left: '-300px',
	    top: 0
	  }).each(function(index) {
	    $(this).animate({
	      left: 0,
	      top: 25 * index
	    }, {
	      duration: 'slow',
	      specialEasing: {
	        top: 'easeInQuart'
	      }
	    });
	  }).promise().done(showBio);
	}


    $('div.member').on('mouseenter mouseleave', function(event) {

    	var size = event.type === 'mouseenter' ? 85 : 75;
    	var padding = event.type === 'mouseenter' ? 0 : 5;

  		$(this).find("img").stop().animate({
  			width: size,
  			height: size,
  			paddingTop: padding,
  			paddingLeft: padding
  		});
    }).click(showDetails);
});

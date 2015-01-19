// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.
$(document).ready(function() {

	// change ui style
	var h = document.getElementsByTagName('head')[0],
	    link = document.createElement('link');

	link.href = 'ui-themes/le-frog/jquery-ui-1.10.0.custom.css';
	link.rel = 'stylesheet';
	h.appendChild(link);


    var $books = $('#books').cycle({
		timeout: 2000,
		speed: 200,
		pause: true,
		before: function() {
		  $('#slider').slider('value', $('#books li').index(this));
		}
    });

    if ( $.cookie('cyclePaused') ) {
      $books.cycle('pause');
    }

    var $controls = $('<div id="books-controls"></div>').insertAfter($books);

    // pause button
    $('<button>Pause</button>').click(function(event) {
      event.preventDefault();
      $books.cycle('pause');
      $.cookie('cyclePaused', 'y');
    }).button({                              // from jquery ui
	  icons: {primary: 'ui-icon-pause'}
	}).appendTo($controls);

    // resume button
    $('<button>Resume</button>').click(function(event) {
      event.preventDefault();
      var $paused = $('ul:paused');
      if ($paused.length) {
        $paused.cycle('resume');
        $.cookie('cyclePaused', null);
      }
      else {
        $(this).effect('shake', {   // from jquery ui
          distance: 10
        });
      }
    }).button({
    	icons: {primary: 'ui-icon-play'}
    }).appendTo($controls);

    // add slider
    $('<div id="slider"></div>').slider({  // from jquery ui
      min: 0,
      max: $('#books li').length - 1,
      slide: function(event, ui) {
        $books.cycle(ui.value);
      }
    }).appendTo($controls);

    // books hover
    $books.hover(function() {
      $books.find('.title').animate({
        backgroundColor: '#eee',
        color: '#000'
      }, 1000);
    }, function() {
      $books.find('.title').animate({
        backgroundColor: '#000',
        color: '#fff'
      }, 1000);
    });

    // toggle effect
    $('h1').click(function() {
      $(this).toggleClass('highlighted', 'slow', 'easeInExpo');  // from jquery ui
    });

    // resizable
    $('#books .title').resizable({  // from jquery ui
    	handles: "s"
    });

    // button
    // $('button').button();  // from jquery ui
});
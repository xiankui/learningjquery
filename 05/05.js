// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.
$(document).ready(function () {
	// use attr add rel title and id
	$(".chapter a[href*=wikipedia]").attr({
		rel: "external",
		title: function () {
			return 'Learn more about ' + $(this).text() + ' at Wikipedia.';
		},
		id: function (index, oldValue) {  // index and oldValue is come with automedically
			return 'wikilink-' + index;
		}
	});

	// Add "back to top" links.
	$('<a href="#top">back to top</a>').insertAfter('div.chapter p');
	$('<a id="top"></a>').prependTo('body');

	// Create footnotes.
	$notes = $('<ol id="notes"></ol>').insertBefore("#footer");
	$("span.footnote").each(function (index) {
		$(this)
		  // the original position 
		  .before([
		    '<a href="#footnote-',
		    index + 1,
		    '" id="context-',
		    index + 1,
		    '" class="context">',
		    '<sup>',
		    index + 1,
		    '</sup></a>'
		  ].join(''))
		  // move to a new position
		  .appendTo($notes)
		  .append([
		    '&nbsp;(<a href="#context-',
		    index + 1,
		    '">context</a>)'
		  ].join(''))
		  // wraped with li tag
		  .wrap('<li id="footnote-' + (index + 1) + '"></li>');
	});

	// Style pull quotes.
	$('span.pull-quote').each(function(index) {
	  var $parentParagraph = $(this).parent('p');
	  $parentParagraph.css('position', 'relative');

	  var $clonedCopy = $(this).clone();

	  $clonedCopy
	  	.addClass("pulled")
	  	.find('span.drop')
	  		.html("&hellip;")
	  	.end()
	  	.text($clonedCopy.text())  // exploded tag in $cloneCopy
	  	.prependTo($parentParagraph);
	});
});
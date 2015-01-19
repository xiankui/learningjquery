// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.



/******************************************************************************
  :group()
  Select n elements, skip n elements, etc.
******************************************************************************/
(function($) {
  $.expr.setFilters.group = function(elements, argument, not) {
    var resultElements = [];
    for (var i = 0; i < elements.length; i++) {
      var test = i % (argument * 2) < argument;

      if ((!not && test) || (not && !test)) {
        resultElements.push(elements[i]);
      }
    }
    return resultElements;
  };
})(jQuery);



/******************************************************************************
  :column()
  Select all table cells in the same column as the one specified.
******************************************************************************/
(function($) {
  $.fn.column = function() {
  	// a jquery empty object
    var $cells = $();
    
    this.each(function() {
      // the element itself
      var $td = $(this).closest('td, th');

      if ($td.length) {
        var colNum = $td[0].cellIndex + 1;   // oh, cellIndex!!!
        var $columnCells = $td
          .closest('table')
          .find('td, th')
          .filter(':nth-child(' + colNum + ')');
        $cells = $cells.add($columnCells);
      }
    });
    return this.pushStack($cells);  // jquery DOM collection is a stack!!!
  };
})(jQuery);



$(document).ready(function () {
  var $news = $("#news");

	function stripe() {
    $news
      .find("tr.alt").removeClass("alt").end()
      .find("tbody").each(function () {
        $(this).children(":visible").has("td")
          //.filter(":group(3)").addClass("alt");
          .filter(function (index) {
            return (index % 6) < 3;
          }).addClass("alt");
      });
	}
	stripe();

	// filter by topic
	$('#topics a').click(function(event) {
	  event.preventDefault();
	  var topic = $(this).text();

	  $('#topics a.selected').removeClass('selected');
	  $(this).addClass('selected');

	  $news.find('tr').show();
	  if (topic != 'All') {
	    $news.find('tr:has(td)').not(function() {
	      return $(this).children(':nth-child(4)').text() == topic;
	    }).hide();
	  }
	  stripe();
	});

	// nextAll and the right element
	$('#release').nextAll().addBack().addClass('highlight');

	// $.fn.column
	$('#news td').click(function() {
	  $('#news td.active').removeClass('active');
	  $(this).column().addClass('active');
	});
});
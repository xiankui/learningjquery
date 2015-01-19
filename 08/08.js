// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.


/******************************************************************************
  $.sum()
  Return the total of the numeric values in an array/object.
******************************************************************************/
(function ($) {
	$.mathUtils = {
		sum: function(array) {
	      var total = 0;

	      $.each(array, function(index, value) {
	        value = $.trim(value);
	        value = parseFloat(value) || 0;

	        total += value;
	      });
	      return total;
	    },
	    average: function(array) {
	      if ($.isArray(array)) {
	        return $.mathUtils.sum(array) / array.length;
	      }
	      return '';
	    } 
	};
})(window.jQuery);


/******************************************************************************
  .swapClass()
  Exchange one class for another on the selected elements.
******************************************************************************/
(function($) {
  $.fn.swapClass = function(class1, class2) {
    return this.each(function() {
      var $element = $(this);
      if ($element.hasClass(class1)) {
        $element.removeClass(class1).addClass(class2);
      } else if ($element.hasClass(class2)) {
        $element.removeClass(class2).addClass(class1);
      }
    });
  };
})(jQuery);


/******************************************************************************
  .shadow()
  Create a shadow effect on any element by brute-force copying.
******************************************************************************/
(function($) {
    $.fn.shadow = function(opts) {
	  	

	  	var options = $.extend({}, $.fn.shadow.defaults, opts);

	    return this.each(function() {
	      var $originalElement = $(this),
	      	  offset;

	      for (var i = 0; i < options.copies; i++) {

	      	offset = options.copyOffset(i);

	        $originalElement
	          .clone()
	          .css({
	            position: 'absolute',
	            left: $originalElement.offset().left + offset.x,
	            top: $originalElement.offset().top + offset.y,
	            margin: 0,
	            zIndex: -1,
	            opacity: options.opacity
	          })
	          .appendTo('body');
	      }
	    });
    };

    $.fn.shadow.defaults = {
  		copies: 5,
  		opacity: 0.1,
  		copyOffset: function (index) {
  			return {x: index, y: index};
  		}
  	};
})(jQuery);



/******************************************************************************
  .tooltip()
  A simple jQuery UI tooltip widget.
******************************************************************************/
(function($) {
  $.widget('ljq.tooltip', {
  	options: {
  	  offsetX: 10,
  	  offsetY: 10,
  	  content: function() {
  	    return $(this).data('tooltip-text');
  	  }
  	},

  	// init automatically
    _create: function() {
      // .this. is the widget
      this._tooltipDiv = $('<div></div>')
        .addClass('ljq-tooltip-text ui-widget ui-state-highlight ui-corner-all')
        .hide().appendTo('body');

      // this.element is the element that triggered  
      this.element  
        .addClass('ljq-tooltip-trigger')
        .on('mouseenter.ljq-tooltip', $.proxy(this._open, this))
        .on('mouseleave.ljq-tooltip', $.proxy(this._close, this));
    },

    destroy: function() {
      this._tooltipDiv.remove();
      this.element
        .removeClass('ljq-tooltip-trigger')
        .off('.ljq-tooltip');
      $.Widget.prototype.destroy.apply(this, arguments);
    },

    open: function () {
    	this._open();
    },

    close: function () {
    	this._close();
    },

    _open: function() {
      if (!this.options.disabled) {
        var elementOffset = this.element.offset();
        this._tooltipDiv.css({
          position: 'absolute',
          left: elementOffset.left + this.options.offsetX,
          top: elementOffset.top + this.element.height() + this.options.offsetY
        }).text(this.options.content.call(this.element[0]));
        this._tooltipDiv.show();
        //this._trigger('open');
      }
    },

    _close: function() {
      this._tooltipDiv.hide();
      // this._trigger('close');
    }
  });
})(jQuery);



/******************************************************************************
  End plugin code; begin custom script code.
******************************************************************************/
$(document).ready(function() {
  var $inventory = $('#inventory tbody');

  // get quantities array
  var quantities = $inventory.find('td:nth-child(2)')
  .map(function(index, qty) {
    return $(qty).text();
  }).get();

  // get prices array
  var prices = $inventory.find('td:nth-child(3)')
  .map(function(index, qty) {
    return $(qty).text();
  }).get();

  var sum = $.mathUtils.sum(quantities);
  var average = $.mathUtils.average(prices);
  $('#sum').find('td:nth-child(2)').text(sum);
  $('#average').find('td:nth-child(3)').text(average.toFixed(2));

  // swap class
  $('table').click(function() {
    $('tr').swapClass('one', 'two');
  });

  // shadow
  $("h1").shadow({
  	copyOffset: function(index) {
      return {x: -index, y: index};
    }
  });

  // tootip
  $('a').tooltip({
  	disabled: false
  });
});
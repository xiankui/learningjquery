// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.



// selecting elements
$(document).ready(function () {
	$("#selected-plays").children("li").addClass("horizontal");

	$("#selected-plays").find("li").not(".horizontal").addClass("sub-level");

	$("a[href^='mailto:']").addClass("mailto");

	$("a[href$='.pdf']").addClass("pdflink");

	$('a[href^="http"][href*="henry"]').addClass("henrylink");

	$('tr:nth-child(odd)').addClass('alt');
	// $('tr').filter(":even").addClass('alt');
	// $('td:contains("Henry")').addClass('highlight');

	$('a').filter(function () {
		return this.hostname && this.hostname !== location.hostname;
	}).addClass('external');

	// $('td:contains("Henry")').nextAll().addBack().addClass('highlight');
	// $('td:contains("Henry")').parent().children().addClass('highlight');
	$('td:contains("Henry")')
		.parent()
		.find('td:eq(1)')
		.addClass('highlight')
		.end()
		.find('td:eq(2)')
		.addClass('highlight');


	// 给位于嵌套列表第二个层次的所有<li>元素添加special类
	$("#selected-plays").children("li").children("ul").children("li").find("li").addClass("special");

	// 给位于表格第三列的所有单元格添加year类
	$("td:nth-child(3)").addClass("year");

	// 为表格中包含文本Tragedy的第一行添加special类
	$('td:contains("Tragedy")').parent().find('td:eq(0)').addClass("special");

	// 选择包含链接（<a>）的所有列表项（<li>元素），为每个选中的列表项的同辈列项元素添加afterlink类
	$('a').parent('li').nextAll().addClass('afterlink');
});
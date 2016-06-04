function print_r(obj)
{
	var s = '<h1>' + obj + '</h1>';
	s += '<ol>';

	for (p in obj)
		s += '<li><b>' + p + '</b> : ' + obj[p] + '</li>';
	
	s += '</ol>';

	var win = window.open("about:blank");
	win.onload = function()
	{
		win.document.head.innerHTML = '<title>' + obj + '</title><meta charset="utf-8">';

		win.document.body.innerHTML = s;
	}
}
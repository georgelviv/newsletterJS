(function app() {

	var $_$ = window.$_$;

	var statusValueDom = document.getElementsByClassName('status__value')[0];
	statusValueDom.innerHTML = 'loading';

	$_$.getRequest('/last', lastCb);

	function lastCb(data) {
		var contentDom = document.getElementsByClassName('main__content')[0];
		contentDom.innerHTML = formatDomString(JSON.parse(data));
		statusValueDom.innerHTML = 'ready';
	}

	function formatDomString(obj) {
		var resString = '';
		obj.forEach(function (value) {
			resString += '<article class="main__article">';
			resString += '<h2>' + $_$.escapeHtml(value.title) + '</h2>';
			resString += '<p class="article__paragraph">' + $_$.paragraphWrapper($_$.escapeHtml(value.description)) + '</p>';
			resString += '</article>';
		});
		return resString;
		
	}



})();
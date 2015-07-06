(function app() {

	var $_$ = window.$_$;

	var statusValueDom = document.getElementsByClassName('status__value')[0];
	statusValueDom.innerHTML = 'loading';

	$_$.getRequest('/articles/', lastCb);

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
			resString += '<footer class="article__footer">';
			resString += '<time class="article__footer__datetime" datetime="' + value.date + '">' + value.date + '</time>';
			resString += '<span class="article__footer__index">' + value.index + '</span>';
			resString += '</footer>';
			resString += '</article>';
		});
		return resString;
		
	}

})();
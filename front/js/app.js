(function app() {

	var $_$ = window.$_$;
	var viewDom = document.getElementsByClassName('main__view')[0];

	var routeProvider = new $_$.Router({
		viewDom: viewDom,
		defaultUrl: 'articles',
		titleSufix: 'newsletterJS'
	});
	routeProvider.route({
		url: 'articles',
		state: 'Last Articles',
		templateUrl: 'articles.tpl'
	});

	function articlesCtrl() {
		$_$.getRequest('/articles/1-25', lastCb);

		return '<div class="main__content"></div>';

		function lastCb(data) {
			var contentDom = document.getElementsByClassName('main__content')[0];
			contentDom.innerHTML = formatDomString(JSON.parse(data));
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
	}

})();
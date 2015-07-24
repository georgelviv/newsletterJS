(function appModule() {
	'use strict';

	window.$_$.setGlobals({
		appName: 'newsletterJS',
		appNode: document.getElementsByClassName('main')[0],
		viewNode: document.getElementsByClassName('main__view')[0]
	});

	var routeProvider = new ($_$.getModuleApi('router', 'Router'))({
		defaultUrl: 'articles',
		titleSufix: 'newsletterJS'
	});

	var articlesRoute = routeProvider.route({
		url: 'articles',
		state: 'Last Articles',
		templateUrl: 'articles.tpl',
		controller: articlesController
	});

	var error404Route = routeProvider.route({
		url: '404',
		state: '404 not found',
		templateUrl: '404.tpl'
	});

	function articlesController (router, routObj) {
		var range = 25;
		var page = 1;
		var getRequest = $_$.getModuleApi('utils', 'getRequest');

		router.setConfig('range', range);
		router.setConfig('page', page);

		if (routObj && routObj.urlParams) {
			page = Number(routObj.urlParams);
			router.setConfig('page', page);
		}

		getRequest('/articles?range=' + (range * page + 1 - range) + '-' + (range * page), lastCb);
		
		function lastCb(data) {
			var dataParse = JSON.parse(data);
			if (dataParse && !dataParse.articles.length && !dataParse.sites.length) { 
				return; 
			}

			var articlesArray = formatData(dataParse.articles);

			articlesRoute.setConfig('articles', articlesArray);
			articlesRoute.setConfig('sites', dataParse.sites);
			routeProvider.updateView();

			function formatData(array) {
				var escapeHtml = $_$.getModuleApi('utils', 'escapeHtml');
				var paragraphWrapper = $_$.getModuleApi('utils', 'paragraphWrapper');
				array.forEach(function (value) {
					value.title = escapeHtml(value.title);
					value.description = paragraphWrapper(escapeHtml(value.description));
					value.linkRead = '#/article/' + value.index;
				});
				return array;
			}
			
		}		
	}

})();
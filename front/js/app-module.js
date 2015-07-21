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

	function articlesController (self, routObj) {
		var RANGE = 25;
		var page = 1;
		var getRequest = $_$.getModuleApi('utils', 'getRequest');

		var pageSettingsNode = document.getElementsByClassName('page-settings')[0];
		var expandBtnNode = document.getElementsByClassName('page-settings__expand-btn')[0];

		expandBtnNode.addEventListener('click', toggleOpenPageSettings, false);

		console.log(expandBtnNode);

		function toggleOpenPageSettings () {
			console.log(1);
			if (pageSettingsNode.className.indexOf('page-settings--open') !== -1) {
				pageSettingsNode.className.replace('page-settings--open', '');
				pageSettingsNode.className = pageSettingsNode.className.trim();
			} else {
				pageSettingsNode.className += ' page-settings--open';
			}
		}

		if (routObj && routObj.urlParams) {
			page = Number(routObj.urlParams);
		}

		getRequest('/articles?range=' + (RANGE * page + 1 - RANGE) + '-' + (RANGE * page), lastCb);
		
		function lastCb(data) {
			var dataParse = JSON.parse(data);
			if (dataParse && !dataParse.articles.length) { 
				return; 
			}

			var articlesArray = formatData(dataParse.articles);

			setPagesConfigs();
			articlesRoute.setConfig('articles', articlesArray);
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
			function setPagesConfigs () {
				self.setConfig('pageCurrent', page);
				self.setConfig('prevPageLink', '#/articles/' + (page - 1));
				self.setConfig('nextPageLink', '#/articles/' + (page + 1));
				self.setConfig('prevPage', page > 1);
				self.setConfig('nextPage', articlesArray[articlesArray.length - 1].index > 1);
				self.setConfig('lastPageLink', '#/articles/' + (Math.ceil(articlesArray[0].index / RANGE) + (page - 1)));
			}
		}		
	}

})();
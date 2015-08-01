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
		var reqParams = {
			range: 25,
			page: 1,
			filter: null
		};

		var getRequest = $_$.getModuleApi('utils', 'getRequest');

		if (routObj && routObj.urlParams) {
			if (routObj.urlParams.page) {
				reqParams.page = Number(routObj.urlParams.page);
			}
			if (routObj.urlParams.filter) {
				reqParams.filter = routObj.urlParams.filter;
			}
		}

		router.setConfig('range', reqParams.range);
		router.setConfig('page', reqParams.page);
		router.setConfig('filter', reqParams.filter);

		getRequest(setRequestLink(reqParams), lastCb);

		function setRequestLink (obj) {
			var paramsArr = [];
			var resultLink = '/articles';
			var requestRange = (obj.range * obj.page + 1 - obj.range) + '-' + (obj.range * obj.page);

			if (requestRange) {
				paramsArr.push('range=' + requestRange);
			}

			if (obj.filter) {
				paramsArr.push('filter=' + obj.filter);
			}

			if (paramsArr.length) {
				resultLink += '?';
				resultLink += paramsArr.join('&');
			}

			return resultLink;
		}
		
		function lastCb(data) {
			var dataParse = JSON.parse(data);
			if (dataParse && !dataParse.articles.length && !dataParse.sites.length) { 
				return; 
			}

			var articlesArray = formatData(dataParse.articles);
			dataParse.sites.unshift('All');

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
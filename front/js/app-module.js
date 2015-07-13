(function app() {
	'use strict';

	var $_$ = window.$_$;
	var utils = $_$.utils;
	var viewNode = document.getElementsByClassName('main__view')[0];

	var routeProvider = new $_$.Router({
		viewNode: viewNode,
		defaultUrl: 'articles',
		titleSufix: 'newsletterJS'
	});

	var articleRoute = routeProvider.route({
		url: 'articles',
		state: 'Last Articles',
		templateUrl: 'articles.tpl',
		controller: articlesController
	});

	function articlesController (self, params) {
		var range = 25;
		var page = 1;

		if (params) {
			page = Number(params);
		}

		utils.getRequest('/articles/' + (range * page + 1 - range) + '-' + (range * page), lastCb);
		
		function lastCb(data) {
			var dataParse = JSON.parse(data);
			if (!dataParse.length) { 
				return; 
			}

			var articlesArray = formatData(dataParse);

			setPagesConfigs();
			articleRoute.setConfig('articles', articlesArray);
			routeProvider.updateView();

			function formatData(array) {
				array.forEach(function (value) {
					value.title = utils.escapeHtml(value.title);
					value.description = utils.paragraphWrapper(utils.escapeHtml(value.description));
				});
				return array;
			}
			function setPagesConfigs () {
				self.setConfig('prevPageLink', '#/articles/' + (page - 1));
				self.setConfig('nextPageLink', '#/articles/' + (page + 1));
				self.setConfig('prevPage', page > 1);
				self.setConfig('nextPage', articlesArray[articlesArray.length - 1].index > 1);
			}
		}		
	}

})();
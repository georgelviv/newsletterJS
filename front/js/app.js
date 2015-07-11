(function app() {

	var $_$ = window.$_$;
	var utils = $_$.utils;
	var viewDom = document.getElementsByClassName('main__view')[0];

	var routeProvider = new $_$.Router({
		viewDom: viewDom,
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
			var articlesArray = formatData(JSON.parse(data));

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
		}
		function setPagesConfigs () {
			self.setConfig('prevPageLink', '#/articles/' + (page - 1));
			self.setConfig('nextPageLink', '#/articles/' + (page + 1));
		}
	}

	



})();
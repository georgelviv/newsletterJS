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
		templateUrl: 'articles.tpl'
	});

	utils.getRequest('/articles/1-25', lastCb);

	function lastCb(data) {
		var array = formatData(JSON.parse(data));

		articleRoute.setConfig('data', array);
		routeProvider.updateView();

		function formatData(array) {
			array.forEach(function (value) {
				value.title = utils.escapeHtml(value.title);
				value.description = utils.paragraphWrapper(utils.escapeHtml(value.description));
			});
			return array;
		}
	}

})();
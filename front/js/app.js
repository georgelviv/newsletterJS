(function app() {

	var $_$ = window.$_$;
	var utils = $_$.utils;
	var viewDom = document.getElementsByClassName('main__view')[0];

	var routeProvider = new $_$.Router({
		viewDom: viewDom,
		defaultUrl: 'articles',
		titleSufix: 'newsletterJS'
	});

	var articlesRoute = routeProvider.route({
		url: 'articles',
		state: 'Last Articles',
		templateUrl: 'articles.tpl',
		controller: articlesController
	});

	var articleRoute = routeProvider.route({
		url: 'article',
		state: 'Read Article',
		templateUrl: 'article.tpl',
		controller: articleController
	});

	function articlesController (self, routObj) {
		var range = 25;
		var page = 1;

		if (routObj.urlParams) {
			page = Number(routObj.urlParams);
		}

		utils.getRequest('/articles/' + (range * page + 1 - range) + '-' + (range * page), lastCb);
		
		function lastCb(data) {
			var dataParse = JSON.parse(data);
			if (!dataParse.length) { 
				return; 
			}

			var articlesArray = formatData(dataParse);

			setPagesConfigs();
			articlesRoute.setConfig('articles', articlesArray);
			routeProvider.updateView();

			function formatData(array) {
				array.forEach(function (value) {
					value.title = utils.escapeHtml(value.title);
					value.description = utils.paragraphWrapper(utils.escapeHtml(value.description));
					value.linkRead = '#/article/' + value.index;
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

	function articleController (self, routObj) {
		var goBackLink = routObj.fromUrl;
		console.log(!goBackLink.match(/articles/i), goBackLink);
		if (!goBackLink.match(/articles/i)) {
			goBackLink = '/#/articles';
		}
		self.setConfig('fromLink', goBackLink);
	}

})();
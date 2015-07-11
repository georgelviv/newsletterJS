(function router () {

	window.$_$ = window.$_$ || {};
	window.$_$.Router = Router;

	var $_$ = window.$_$;

	function Router (configs) {
		var routes = {};
		var viewDom = configs.viewDom || document.body;
		var defaultView = configs.defaultUrl || '';
		var titleSufix = configs.titleSufix || 'newsletterJS';
		var templatesProvider = new $_$.TemplatesProvider();

		this.route = route;

		window.addEventListener('hashchange', routing);
		window.addEventListener('load', routing);

		function routing () {
			if (!location.hash) {
				location.hash = '#/';
			}
			var urlHash = getUrlHash();
			if (routes[urlHash]) {
				routeSwitch(urlHash);
			} else {
				location.hash = '#/' + defaultView;
				routeSwitch(defaultView);
			}
			
		}

		function route (configs) {
			routes[configs.url] = {};
			routes[configs.url].state = configs.state;
			if (configs.templateUrl) {
				routes[configs.url].templateUrl = configs.templateUrl;
			}
		}

		function routeSwitch (route) {
			renderTemplate(route);
			changeTitle();
		}

		function renderTemplate (url) {
			if (routes[url]) {
				var routesObj = routes[url];
				if (templatesProvider.getTemplate(routesObj.template)) {
					if ($_$.isFunction(routesObj.template)) {
						viewDom.innerHTML = routesObj.template;
					}
				}
			}
		}

		function changeTitle() {
			var urlHash = getUrlHash();
			var titleDom = document.head.getElementsByTagName('title')[0];
			if (routes[urlHash] && routes[urlHash].state) {
				titleDom.innerHTML = routes[urlHash].state + ' | ' + titleSufix;
			} else {
				titleDom.innerHTML = titleSufix;
			}
		}

		function getUrlHash() {
			return location.hash.substring(2);
		}
	}

})();
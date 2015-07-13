(function router () {

	window.$_$ = window.$_$ || {};
	window.$_$.Router = Router;

	var $_$ = window.$_$;
	var utils = $_$.utils;

	function Router (configs) {
		var routerPrivate = {
			routes: {},
			viewDom: configs.viewDom || document.body,
			defaultView: configs.defaultUrl || '',
			titleSufix: configs.titleSufix || 'newsletterJS'
		};

		this.route = route;
		this.updateView = updateView;

		window.addEventListener('hashchange', routing);
		window.addEventListener('load', routing);

		function route (configs) {
			if (configs.url) {
				routerPrivate.routes[configs.url] = new $_$.Route(configs);
				routerPrivate.routes[configs.url].setConfig('viewDom', routerPrivate.viewDom);
				return routerPrivate.routes[configs.url];
			}
		}

		function routing () {
			if (!location.hash) {
				location.hash = '#/';
			}
			updateState();
			if (routerPrivate.routes[routerPrivate.state]) {
				routeSwitch(routerPrivate.state);
			} else {
				location.hash = '#/' + routerPrivate.defaultView;
				updateState();
				routeSwitch(routerPrivate.defaultView);
			}	
		}

		function updateView () {
			routerPrivate.routes[routerPrivate.state].renderAttr();
		}

		function routeSwitch () {
			console.log(routerPrivate.state);
			routerPrivate.routes[routerPrivate.state].render(routerPrivate.params);
			changeTitle();
		}

		function changeTitle () {
			var urlHash = routerPrivate.state;
			var titleDom = document.head.getElementsByTagName('title')[0];
			var state = routerPrivate.routes[urlHash] && routerPrivate.routes[urlHash].state;
			if (state) {
				titleDom.innerHTML = state + ' | ' + routerPrivate.titleSufix;
			} else {
				titleDom.innerHTML = routerPrivate.titleSufix;
			}
		}

		function updateState () {
			var hash = location.hash.substring(2);
			if (routerPrivate.routes[hash]) {
				routerPrivate.state = hash;
				routerPrivate.params = null;
				return;
			}

			var hashArray = hash.split('/');
			var hashWithoutParams = (hashArray.slice(0, -1)).join('/');

			if (routerPrivate.routes[hashWithoutParams]) {
				routerPrivate.state = hashWithoutParams;
				routerPrivate.params = hashArray[hashArray.length - 1];
			} else {
				routerPrivate.state = hash;
				routerPrivate.params = null;
			}
		}

	}

})();
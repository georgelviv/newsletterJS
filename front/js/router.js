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
			titleSufix: configs.titleSufix || 'newsletterJS',
			templatesProvider: new $_$.TemplatesProvider(),
			currentUrl:  getUrlHash()
		};

		this.route = route;
		this.updateView = updateView;

		window.addEventListener('hashchange', routing);
		window.addEventListener('load', routing);

		function route (configs) {
			if (configs.url) {
				routerPrivate.routes[configs.url] = new $_$.Route(configs);
				return routerPrivate.routes[configs.url];
			}
		}

		function routing () {
			if (!location.hash) {
				location.hash = '#/';
			}
			if (routerPrivate.routes[routerPrivate.currentUrl]) {
				routeSwitch(routerPrivate.currentUrl);
			} else {
				location.hash = '#/' + routerPrivate.defaultView;
				routeSwitch(routerPrivate.defaultView);
			}
			updateCurrentUrl();	
		}

		function updateView () {
			var url = routerPrivate.currentUrl;
			var data = routerPrivate.routes[url] && routerPrivate.routes[url].getConfig('data');
			if (data) {
				dataRepeat(data, routerPrivate.viewDom);
			}
			function dataRepeat (data, dom) {
				var dataRepeatAttr = utils.getElemntsByAttribute('data-repeat', dom);
				Array.prototype.forEach.call(dataRepeatAttr, function (route) {
					if (Array.isArray(data)) {
						data.forEach(function (article) {
							var newNode = route.cloneNode(true);
							route.parentNode.insertBefore(newNode, route.nextSibling);
							dataValue(article, newNode);
						});
					}
				});				
			}

			function dataValue (data, dom) {
				var dataValueAttr = utils.getElemntsByAttribute('data-value', dom);
				Array.prototype.forEach.call(dataValueAttr, function (value) {
					var dataKey = value.getAttribute('data-value');
					if (data[dataKey]) {
						value.innerText = data[dataKey];
					}
				});
			}
		}

		function routeSwitch (route) {
			renderTemplate(route);
			updateView();
			changeTitle();
		}

		function renderTemplate (url) {
			var routeObj =  routerPrivate.routes[url];
			if (routeObj) {
				var template = routerPrivate.templatesProvider.getTemplate(routeObj.getConfig('templateUrl'));
				if (template) {
					routerPrivate.viewDom.innerHTML = template;
				}
			}
		}

		function changeTitle () {
			var urlHash = routerPrivate.currentUrl;
			var titleDom = document.head.getElementsByTagName('title')[0];
			var state = routerPrivate.routes[urlHash] && routerPrivate.routes[urlHash].state;
			if (state) {
				titleDom.innerHTML = state + ' | ' + routerPrivate.titleSufix;
			} else {
				titleDom.innerHTML = routerPrivate.titleSufix;
			}
		}

		function updateCurrentUrl () {
			routerPrivate.currentUrl = getUrlHash();
		}

		function getUrlHash () {
			return location.hash.substring(2);
		}
	}

})();
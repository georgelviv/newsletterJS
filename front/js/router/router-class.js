(function router () {
	'use strict';

	window.$_$.addModuleApi('router', {
		Router: Router
	});

	function Router (configs) {
		var routerPrivate = {
			routes: {},
			defaultView: configs.defaultUrl || '',
			prevUrl: location.hash,
			viewNode: window.$_$.getGlobals('viewNode')
		};

		this.route = route;
		this.updateView = updateView;

		window.addEventListener('hashchange', routing);
		window.addEventListener('load', routing);

		function route (configs) {
			if (configs.url) {
				routerPrivate.routes[configs.url] = new ($_$.getModuleApi('router', 'Route'))(configs);
				return routerPrivate.routes[configs.url];
			}
		}

		function routing () {
			var prevUrl = routerPrivate.prevUrl;
			if (!location.hash) {
				location.hash = '#/';
			}
			updateState();
			if (routerPrivate.routes[routerPrivate.state]) {
				routeSwitch(prevUrl);
			} else {
				location.hash = '#/' + routerPrivate.defaultView;
				updateState();
				routeSwitch(prevUrl);
			}
			window.scrollTo(0, 0);
		}

		function updateView () {
			routerPrivate.routes[routerPrivate.state].renderAttr();
		}

		function routeSwitch (prevUrl) {
			routerPrivate.routes[routerPrivate.state].render({
				urlParams:routerPrivate.params,
				fromUrl: prevUrl
			});
			changeTitle();
		}

		function changeTitle () {
			var urlHash = routerPrivate.state;
			var titleNode = document.head.getElementsByTagName('title')[0];
			var state = routerPrivate.routes[urlHash] && routerPrivate.routes[urlHash].state;
			if (state) {
				titleNode.innerHTML = state + ' | ' + window.$_$.getGlobals('appName');
			} else {
				titleNode.innerHTML = window.$_$.getGlobals('appName');
			}
		}

		function updateState () {
			routerPrivate.prevUrl = location.hash;

			var hash = location.hash.substring(2);
			var pathArray = hash.split('/');
			var lastPath = pathArray[pathArray.length - 1];
			var queryArray = lastPath.split('?');

			routerPrivate.state = queryArray[0];
			routerPrivate.params = queryArray[1] && getQueryParams(queryArray[1]) || null;

			return;

			function getQueryParams (queryPart) {
				var objParams = {};
				var params = queryPart.split('&');
				
				params.forEach(function (value) {
					var valueArr = value.split('=');
					var paramKey = valueArr[0];
					var paramValue = valueArr[1];
					objParams[paramKey] = paramValue;
				});

				return objParams;
			}

		}

	}

})();
(function route () {
	'use strict';

	window.$_$.registerModule({
		name: 'router',
		api: {
			Route: Route
		}
	});

	function Route (configs) {
		var privateObj = {
			state: configs.state,
			url: configs.url,
			template: configs.template || null,
			controller: ($_$.getModuleApi('utils', 'isFunction'))(configs.controller) && configs.controller || null,
			viewNode: window.$_$.getGlobals('viewNode')
		};

		var route = this;

		this.setConfig = setConfig;
		this.getConfig = getConfig;
		this.renderAttr = renderAttr;
		this.render = render;

		initRoute();

		return route;

		function initRoute () {
			if (configs.templateUrl) {
				privateObj.template = ($_$.getModuleApi('templates', configs.templateUrl));
			}		
		}

		function render (params) {
			if (privateObj.controller) {
				privateObj.controller(route, params);
			}
			templateRender();
			renderAttr();
		}

		function setConfig (key, value) {
			if (key) {
				privateObj[key] = value;
			}
		}

		function getConfig (key) {
			return privateObj[key];
		}

		function templateRender () {
			privateObj.viewNode.innerHTML = privateObj.template.content;
		}

		function renderAttr () {
			($_$.getModuleApi('renderAttribute', 'renderAttr'))(route, privateObj.viewNode);
		}
	} 

})();

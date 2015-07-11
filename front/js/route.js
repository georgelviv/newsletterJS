(function route () {
	'use strict';

	window.$_$ = window.$_$ || {};
	window.$_$.Route = Route;
	var utils = $_$.utils;
	var templatesProvider = new $_$.TemplatesProvider();

	function Route (configs) {
		var privateObj = {
			state: configs.state,
			url: configs.url,
			template: configs.template || null,
			controller: utils.isFunction(configs.controller) && configs.controller || null,
			viewDom: document.body
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
				privateObj.template = templatesProvider.getTemplate(configs.templateUrl);
			}		
		}

		function render (params) {
			if (privateObj.controller) {
				privateObj.controller(route, params);
			}
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

		function renderAttr () {
			privateObj.viewDom.innerHTML = privateObj.template;
			window.$_$.renderAttr(privateObj, privateObj.viewDom);
		}
	} 

})();
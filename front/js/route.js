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
			if (key && value) {
				privateObj[key] = value;
			}
		}

		function getConfig (key) {
			return privateObj[key];
		}

		function renderAttr () {
			privateObj.viewDom.innerHTML = privateObj.template;

			dataAddRender(privateObj, privateObj.viewDom);
			dataValueRender(privateObj, privateObj.viewDom);
			dataRepeatRender(privateObj.viewDom);

			function dataRepeatRender (dom) {
				var dataRepeatAttr = utils.getElemntsByAttribute('data-repeat', dom);
				Array.prototype.forEach.call(dataRepeatAttr, function (route) {
					var dataKey = route.getAttribute('data-repeat');
					var dataValue = privateObj[dataKey];
					if (Array.isArray(dataValue)) {
						dataValue.forEach(function (article) {
							var newNode = route.cloneNode(true);
							var dataItem = utils.addPrefixKey(article, 'item.');
							route.parentNode.insertBefore(newNode, route);
							dataValueRender(dataItem, newNode);
							dataAddRender(dataItem, newNode);
						});
					}
				});				
			}

			function dataAddRender (data, dom) {
				var dataAddAttr = utils.getElemntsByAttribute('data-add-attr', dom);
				Array.prototype.forEach.call(dataAddAttr, function (tagDom) {
					var dataKeyArray = (tagDom.getAttribute('data-add-attr')).split(',');
					var attrName = dataKeyArray[0].trim();
					var attrValue = dataKeyArray[1].trim();
					if (attrValue && data[attrValue]) {
						tagDom.setAttribute(attrName, data[attrValue]);
					}
				});
			}

			function dataValueRender (data, dom) {
				var dataValueAttr = utils.getElemntsByAttribute('data-value', dom);
				Array.prototype.forEach.call(dataValueAttr, function (tagDom) {
					var dataKey = tagDom.getAttribute('data-value');
					if (data[dataKey]) {
						tagDom.innerText = data[dataKey];
					}
				});
			}
		}
	} 

})();
(function attrRender () {
	'use strict';

	window.$_$ = window.$_$ || {};
	window.$_$.renderAttr = renderAttr;
	var utils = $_$.utils;

	function renderAttr (data, viewNode) {
		var getElemntsByAttribute = $_$.getModuleApi('utils', 'getElemntsByAttribute');

		addRender(data, viewNode);
		valueRender(data, viewNode);
		addClassIfNotRender(data, viewNode);
		repeatRender(data, viewNode);

		function repeatRender (data, Node) {
			var dataRepeatAttr = getElemntsByAttribute('data-repeat', Node);
			Array.prototype.forEach.call(dataRepeatAttr, function (route) {
				var dataKey = route.getAttribute('data-repeat');
				var dataValue = data[dataKey];
				if (Array.isArray(dataValue)) {
					dataValue.forEach(function (article) {
						var newNode = route.cloneNode(true);
						var dataItem = ($_$.getModuleApi('utils', 'addPrefixKey'))(article, 'item.');
						route.parentNode.insertBefore(newNode, route);
						valueRender(dataItem, newNode);
						addRender(dataItem, newNode);
					});
					route.parentNode.removeChild(route);
				}
			});				
		}

		function addRender (data, Node) {
			var dataAddAttr = getElemntsByAttribute('data-add-attr', Node);
			Array.prototype.forEach.call(dataAddAttr, function (tagNode) {
				var dataKeyArray = (tagNode.getAttribute('data-add-attr')).split(',');
				var attrName = dataKeyArray[0].trim();
				var attrValue = dataKeyArray[1].trim();
				if (attrValue && data[attrValue]) {
					tagNode.setAttribute(attrName, data[attrValue]);
				}
			});
		}

		function valueRender (data, Node) {
			var dataValueAttr = getElemntsByAttribute('data-value', Node);
			Array.prototype.forEach.call(dataValueAttr, function (tagNode) {
				var dataKey = tagNode.getAttribute('data-value');
				if (data[dataKey]) {
					tagNode.innerText = data[dataKey];
				}
			});
		}

		function addClassIfNotRender (data, Node) {
			var addClassIfNotAttr = getElemntsByAttribute('data-add-class-if-not', Node);
			Array.prototype.forEach.call(addClassIfNotAttr, function (tagNode) {
				var dataKeyArray = (tagNode.getAttribute('data-add-class-if-not')).split(',');
				var attrCondition = dataKeyArray[0].trim();
				var attrClass = dataKeyArray[1].trim();
				if (attrClass && !data[attrCondition]) {
					tagNode.className += ' ' + attrClass;
				}
			});
		}
	}

})();
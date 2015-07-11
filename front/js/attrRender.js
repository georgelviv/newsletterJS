(function attrRender () {

	window.$_$ = window.$_$ || {};
	window.$_$.renderAttr = renderAttr;
	var utils = $_$.utils;

	function renderAttr (data, viewDom) {
		addRender(data, viewDom);
		valueRender(data, viewDom);
		addClassIfNotRender(data, viewDom);
		repeatRender(data, viewDom);

		function repeatRender (data, dom) {
			var dataRepeatAttr = utils.getElemntsByAttribute('data-repeat', dom);
			Array.prototype.forEach.call(dataRepeatAttr, function (route) {
				var dataKey = route.getAttribute('data-repeat');
				var dataValue = data[dataKey];
				if (Array.isArray(dataValue)) {
					dataValue.forEach(function (article) {
						var newNode = route.cloneNode(true);
						var dataItem = utils.addPrefixKey(article, 'item.');
						route.parentNode.insertBefore(newNode, route);
						valueRender(dataItem, newNode);
						addRender(dataItem, newNode);
					});
				}
			});				
		}

		function addRender (data, dom) {
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

		function valueRender (data, dom) {
			var dataValueAttr = utils.getElemntsByAttribute('data-value', dom);
			Array.prototype.forEach.call(dataValueAttr, function (tagDom) {
				var dataKey = tagDom.getAttribute('data-value');
				if (data[dataKey]) {
					tagDom.innerText = data[dataKey];
				}
			});
		}

		function addClassIfNotRender (data, dom) {
			var addClassIfNotAttr = utils.getElemntsByAttribute('data-add-class-if-not', dom);
			Array.prototype.forEach.call(addClassIfNotAttr, function (tagDom) {
				var dataKeyArray = (tagDom.getAttribute('data-add-class-if-not')).split(',');
				var attrCondition = dataKeyArray[0].trim();
				var attrClass = dataKeyArray[1].trim();
				if (attrClass && !data[attrCondition]) {
					tagDom.className += ' ' + attrClass;
				}
			});
		}
	}

})();
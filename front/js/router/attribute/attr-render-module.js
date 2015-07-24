(function attrRender () {
	'use strict';

	window.$_$.addModuleApi('renderAttribute', {
		renderAttr: renderAttr
	});

	function renderAttr (router, viewNode) {
		var getElemntsByAttribute = $_$.getModuleApi('utils', 'getElemntsByAttribute');
		var includeTemplate = $_$.getModuleApi('renderAttribute', 'includeTemplate');

		removeTemporary(viewNode);
		includeTemplate(router, viewNode);
		addRender(router, viewNode);
		valueRender(router, viewNode);
		addClassIfNotRender(router, viewNode);
		repeatRender(router, viewNode);

		function repeatRender (router, Node) {
			var dataRepeatAttr = getElemntsByAttribute('data-repeat', Node);
			Array.prototype.forEach.call(dataRepeatAttr, function (tagNode) {
				var dataKey = tagNode.getAttribute('data-repeat');
				var dataValue = router.getConfig(dataKey);
				
				tagNode.style.display = '';

				if (Array.isArray(dataValue)) {
					dataValue.forEach(function (article) {
						var newNode = tagNode.cloneNode(true);
						var dataItem = ($_$.getModuleApi('utils', 'addPrefixKey'))(article, 'item.');

						newNode.removeAttribute('data-repeat');
						newNode.setAttribute('data-is-temporary', true);

						tagNode.parentNode.insertBefore(newNode, tagNode);
						valueRender(router, newNode, dataItem);
						addRender(router, newNode, dataItem);
					});
				}
				tagNode.style.display = 'none';
			});				
		}

		function addRender (router, Node, privateDate) {
			var dataAddAttr = getElemntsByAttribute('data-add-attr', Node);
			Array.prototype.forEach.call(dataAddAttr, function (tagNode) {
				var dataKeyArray = tagNode.getAttribute('data-add-attr').split(',');
				var attrName = dataKeyArray[0].trim();
				var attrValue = dataKeyArray[1].trim();
				if (attrValue) {
					if (privateDate && privateDate[attrValue]) {
						tagNode.setAttribute(attrName, privateDate[attrValue]);
					} else if (router.getConfig(attrValue)) {
						tagNode.setAttribute(attrName, router.getConfig(attrValue));
					}
				}
			});
		}

		function valueRender (router, Node, privateDate) {
			var dataValueAttr = getElemntsByAttribute('data-value', Node);
			Array.prototype.forEach.call(dataValueAttr, function (tagNode) {
				var dataKey = tagNode.getAttribute('data-value');
				if (privateDate && privateDate[dataKey]) {
					tagNode.innerHTML = privateDate[dataKey];
				} else if (router.getConfig(dataKey)) {
					tagNode.innerHTML = router.getConfig(dataKey);
				}
			});
		}

		function addClassIfNotRender (router, Node) {
			var addClassIfNotAttr = getElemntsByAttribute('data-add-class-if-not', Node);
			Array.prototype.forEach.call(addClassIfNotAttr, function (tagNode) {
				var dataKeyArray = tagNode.getAttribute('data-add-class-if-not').split(',');
				var attrCondition = dataKeyArray[0].trim();
				var attrClass = dataKeyArray[1].trim();

				if (tagNode.className.indexOf(attrClass) !== -1) {
					tagNode.className = tagNode.className.replace(attrClass, '');
					tagNode.className = tagNode.className.trim();
				}

				if (attrClass && !router.getConfig(attrCondition)) {
					tagNode.className += ' ' + attrClass;
				}
			});
		}

		function removeTemporary (Node) {
			var isTemporary = getElemntsByAttribute('data-is-temporary', Node);
			Array.prototype.forEach.call(isTemporary, function (tagNode) {
				var needRemove = tagNode.getAttribute('data-is-temporary');
				if (needRemove) {
					tagNode.parentNode.removeChild(tagNode);
				}
			});			
		}

	}

})();
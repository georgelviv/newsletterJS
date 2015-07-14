(function utility () {
	'use strict';

	window.$_$.registerModule({
		name: 'utils',
		api: {
			request: request,
			isFunction: isFunction,
			escapeHtml: escapeHtml,
			paragraphWrapper: paragraphWrapper,
			getElemntsByAttribute: getElemntsByAttribute,
			addPrefixKey: addPrefixKey
		}
	});

	function request(config) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState==4 && xhr.status==200) {
				if (isFunction(config.cb)) {
					config.cb(xhr.responseText);
				}
			}
		};
		xhr.open(config.method, config.url, true);
		xhr.send();
		return xhr;
	}

	function isFunction (functionToCheck) {
		return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
	}

	function escapeHtml (string) {
		var entityMap = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			'\'': '&#39;',
			'/': '&#x2F;'
		};
		return String(string).replace(/[&<>"'\/\\]/g, function (s) {
			return entityMap[s];
		});
	}

	function paragraphWrapper(string) {
		return string.replace(/.+\n(?=.*)/g, function (s) {
			return '</p><p class="article__paragraph">' + s ;
		});
	}

	function getElemntsByAttribute(attribute, start) {
		var startPoint = start || document;
		if (startPoint.querySelectorAll) {
			return startPoint.querySelectorAll('[' + attribute +']');
		} else {
			var matchingElements = [];
			var allElements = startPoint.getElementsByTagName('*');
			for (var i = 0; i < allElements.length; i++) {
				if (allElements[i].getAttribute(attribute)) {
					matchingElements.push(allElements[i]);
				}
			}
			return matchingElements;
		}
	}

	function addPrefixKey (obj, prefix) {
		var newObj = {};
		for (var key in obj) {
			newObj[prefix + '' + key] = obj[key];
		}
		return newObj;
	}

})();
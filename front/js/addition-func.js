(function additionFunc () {

	window.$_$ = window.$_$ || {};

	window.$_$.getRequest = getRequest;
	window.$_$.request = request;
	window.$_$.isFunction = isFunction;
	window.$_$.escapeHtml = escapeHtml;
	window.$_$.paragraphWrapper = paragraphWrapper;

	function getRequest(url, cb) {
		request(url, 'GET', cb);
	}

	function request(url, method, cb) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState==4 && xhr.status==200) {
				if (isFunction(cb)) {
					cb(xhr.responseText);
				}
			}
		};
		xhr.open(method, url, true);
		xhr.send();
		return xhr;
	}

	function isFunction(functionToCheck) {
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
		return String(string).replace(/[&<>"'\/]/g, function (s) {
			return entityMap[s];
	    });
	}

	function paragraphWrapper(string) {
		return string.replace(/.+\n(?=.*)/g, function (s) {
			return '</p><p class="article__paragraph">' + s ;
		});
	}

})();
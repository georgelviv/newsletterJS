(function requestModule () {
	'use strict';

	var requestCacheObj = {};

	window.$_$.addModuleApi('utils', {
		getRequest: getRequest
	});

	function getRequest (url, cb) {
		if (requestCacheObj[url]) {
			cb(requestCacheObj[url]);
		} else {
			preloadWrapper({
				url: url, 
				method: 'GET', 
				cb: cb,
				preload: true
			});
		}
	}

	function preloadWrapper (config) {
		var appNode = window.$_$.getGlobals('appNode');
		var preloaderNode;
		var preloaderNodeInner = '';

		if (config.preload) {
			preloaderNode = document.createElement('div');
			preloaderNode.className = 'main__preloader__wrapper';
			preloaderNodeInner += '<div class="main__preloader__overlay"></div>';
			preloaderNodeInner += '<div class="main__preloader">';
			for (var i = 0; i < 5; i++) {
				preloaderNodeInner += '<div class="main__preloader__react"></div>';
			}
			preloaderNodeInner += '</div>';
			preloaderNode.innerHTML = preloaderNodeInner;
			appNode.appendChild(preloaderNode);
			appNode.className += ' main--loading';
		}

		($_$.getModuleApi('utils', 'request'))({
			url: config.url, 
			method: config.method, 
			cb: preloadCb || config.cb
		});

		function preloadCb(data) {
			appNode.removeChild(preloaderNode);
			appNode.className = appNode.className.replace('main--loading', '');
			appNode.className = appNode.className.trim();

			requestCacheObj[config.url] = data;
			if (($_$.getModuleApi('utils', 'isFunction'))(config.cb)) {
				config.cb(data);
			}
		}
	}


})();
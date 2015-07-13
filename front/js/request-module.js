(function requestModule () {
	'use strict';

	window.$_$ = window.$_$ || {};
	window.$_$.utils = window.$_$.utils || {};
	window.$_$.utils.getRequest = getRequest;

	var utils = window.$_$.utils;

	function getRequest (url, cb) {
		preloadWrapper({
			url: url, 
			method: 'GET', 
			cb: cb,
			preload: true
		});
	}

	function preloadWrapper (config) {
		var preloaderNode;
		var mainNode;
		var preloaderNodeInner = '';
		if (config.preload) {
			preloaderNode = document.createElement('div');
			mainNode = document.getElementsByClassName('main')[0];
			preloaderNode.className = 'main__preloader';
			for (var i = 0; i < 5; i++) {
				preloaderNodeInner += '<div class="main__preloader__react"></div>';
			}
			preloaderNode.innerHTML = preloaderNodeInner;
			mainNode.appendChild(preloaderNode);
		}

		utils.request({
			url: config.url, 
			method: config.method, 
			cb: preloadCb || config.cb
		});

		function preloadCb(data) {
			// mainNode.removeChild(preloaderNode);
			if (utils.isFunction(config.cb)) {
				config.cb(data);
			}
		}
	}


})();
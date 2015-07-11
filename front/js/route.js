(function route () {
	'use strict';

	window.$_$ = window.$_$ || {};
	window.$_$.Route = Route;

	function Route (configs) {
		var privateObj = {
			state: configs.state,
			url: configs.url,
			templateUrl: configs.templateUrl || null
		};

		this.setConfig = setConfig;
		this.getConfig = getConfig;

		return this;

		function setConfig (key, value) {
			if (key && value) {
				privateObj[key] = value;
			}
		}

		function getConfig (key) {
			return privateObj[key];
		}
	} 

})();
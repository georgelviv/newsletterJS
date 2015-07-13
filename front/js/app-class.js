(function appClass () {
	'use strict';

	window.$_$ = new App();

	function App () {
		var privateObj = {};

		privateObj.globalParams = {
			appName: 'newsletterJs',
			appNode: document.body
		};

		privateObj.modules = {};

		this.registerModule = registerModule;
		this.addModuleApi = addModuleApi;
		this.getGlobals = getGlobals;
		this.setGlobals = setGlobals;
		this.getModuleApi = getModuleApi;

		function registerModule (configs) {
			if (!configs.name || !configs.api) {
				console.log('To register module provide configs.name');
				return;
			}
			if (privateObj.modules[configs.name]) {
				console.log('Module with name:' + configs.name + ' already exist.');
			}

			privateObj.modules[configs.name] = configs.api;
		}

		function setGlobals () {
			if (typeof arguments[0] == 'string') {
				privateObj.globalParams[arguments[0]] = arguments[1];
			}
			if (toString.call(arguments[0]) == '[object Object]') {
				for (var key in arguments[0]) {
					privateObj.globalParams[key] = arguments[0][key];
				}
			}
		}

		function getGlobals (key) {
			return privateObj.globalParams[key];
		}

		function addModuleApi(moduleName, obj) {
			if (!privateObj.modules[moduleName]) {
				console.log('No module with name:' + moduleName + '.');
				return;
			}
			for (var key in obj) {
				privateObj.modules[moduleName][key] = obj[key];
			}
			
		}

		function getModuleApi (module, api) {
			if (!module || !api) {
				console.log('To get module api provide module and api');
			}
			if (privateObj.modules[module] && privateObj.modules[module][api]) {
				return privateObj.modules[module][api];
			} else {
				console.log('There is no api:' + api + ' in module:' + module);
			}
		}
	}

})();
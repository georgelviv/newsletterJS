(function tplController () {
	'use strict';

	console.log(1);
	window.$_$.addModuleApi('templates', {
		'navigation.tpl': {
			controller: function () {
				console.log('wow');
			}
		}
	});

})();
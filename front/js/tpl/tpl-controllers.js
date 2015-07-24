(function tplController () {
	'use strict';

	window.$_$.addModuleApi('templates', {
		'navigation.tpl': {
			controller: navigationController
		},
		'page-settings.tpl': {
			controller: pageSettingsController
		}
	});

	function navigationController (router) {
		var page = router.getConfig('page');
		var range = router.getConfig('range');
		var articlesArray = router.getConfig('articles') || [];

		var indexOfLast = articlesArray[articlesArray.length - 1] && articlesArray[articlesArray.length - 1].index;
		var indexOfFirst = articlesArray[0] && articlesArray[0].index;

		router.setConfig('pageCurrent', page);
		router.setConfig('prevPageLink', '#/articles/' + (page - 1));
		router.setConfig('nextPageLink', '#/articles/' + (page + 1));
		router.setConfig('prevPage', page > 1);
		router.setConfig('nextPage', indexOfLast > 1);
		router.setConfig('lastPageLink', '#/articles/' + (Math.ceil(indexOfFirst / range) + (page - 1)));
	}

	function pageSettingsController () {
		var pageSettingsNode = document.getElementsByClassName('page-settings')[0];
		var expandBtnNode = document.getElementsByClassName('page-settings__expand-btn')[0];
		var contentBtns = document.getElementsByClassName('page-settings__content')[0].getElementsByTagName('button');

		expandBtnNode.addEventListener('click', toggleOpenPageSettings, false);

		function toggleOpenPageSettings () {
			($_$.getModuleApi('utils', 'toggleClass'))(pageSettingsNode, 'page-settings--open');
		}
	}

})();
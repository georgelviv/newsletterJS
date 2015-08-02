(function navigationController () {
	'use strict';

	window.$_$.addModuleApi('templates', {
		'navigation.tpl': {
			controller: {
				func: controller,
				multiply: true
			}
		}
	});

	function controller (router) {
		var articlesArray = router.getConfig('articles') || [];
		var pageData = {
			page: router.getConfig('page'),
			qty: router.getConfig('qty'),
			filter: router.getConfig('filter'),
		};

		router.setConfig('prevPageLink', makeLinkPage(pageData.page - 1));
		router.setConfig('nextPageLink', makeLinkPage(pageData.page + 1));

		router.setConfig('prevPage', pageData.page > 1);
		router.setConfig('nextPage', getIndex().indexOfLast > 1);

		router.setConfig('pageCurrent', pageData.page);

		router.setConfig('firstPageLink', makeLinkPage());
		router.setConfig('lastPageLink', makeLinkPage(getLastPageNum()));

		function getIndex () {
			var lastArticle = articlesArray[articlesArray.length - 1];
			var indexOfLast = lastArticle && lastArticle.indexData;
			var indexOfFirst = articlesArray[0] && articlesArray[0].indexData;
			return {
				indexOfLast: indexOfLast,
				indexOfFirst: indexOfFirst
			};
		}

		function getLastPageNum () {
			return (Math.ceil(getIndex().indexOfFirst / pageData.qty) + (pageData.page - 1));
		}

		function makeLinkPage (page) {
			var paramsArr = [];
			var resultLink = '/#/articles';

			if (page) {
				paramsArr.push('page=' + page);
			}

			if (pageData.filter) {
				paramsArr.push('filter=' + pageData.filter);
			}

			if (pageData.qty) {
				paramsArr.push('qty=' + pageData.qty);
			}

			if (paramsArr.length) {
				resultLink += '?' + paramsArr.join('&');
			}

			return resultLink;
		}
 	}


})();
var correctDate = require('./correct-date-func');

module.exports = articlePrepare;

function articlePrepare (article) {
	var prepareObj = {};

	prepareObj.origin = article.origin || 'No origin';
	prepareObj.title = clearNewLine(article.title) || 'No title';
	prepareObj.description = clearNewLine(article.description) || 'No description';
	prepareObj.link = linkFix(article.link, article.origin) || false;
	prepareObj.date = checkDate(article.date) || todayDate();

	return prepareObj;

	function linkFix(link, origin) {
		if (!link.match(/http:\/\//) && origin !== 'No origin') {
			if (link[link.length - 1] == '/') {
				return link = origin + link.slice(1);
			} else {
				return link = origin + link;
			}
			
		}
		return link;
	}

	function clearNewLine (string) {
		return string.replace(/\n/g, '');
	}

	function todayDate () {
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		return [year, month, day].join('-');
	}

	function checkDate (date) {
		if (!date) {
			console.log('ArticlePrepare: Waring, not date on site:' + article.link);
			return date;
		}
		var splitDate = date.split('-');
		if (!(('' + splitDate[0]).length == 4)) {
			return correctDate(date);
		}
		if (!(('' + splitDate[1]).length == 2 && Number(splitDate[1]) <= 12)) {
			return correctDate(date);
		}
		if (!(('' + splitDate[1]).length == 2 && Number(splitDate[1]) <= 31)) {
			return correctDate(date);
		}
		return date;
	}

}
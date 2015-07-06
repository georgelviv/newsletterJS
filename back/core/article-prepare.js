module.exports = articlePrepare;

function articlePrepare (article) {
	var prepareObj = {};

	prepareObj.origin = article.origin || 'No origin';
	prepareObj.title = clearNewLine(article.title) || 'No title';
	prepareObj.description = clearNewLine(article.description) || 'No description';
	prepareObj.link = article.link || false;
	prepareObj.date = checkDate(article.date) || todayDate();

	return prepareObj;

	function clearNewLine (string) {
		return string.replace(/\n/g, '');
	}

	function todayDate() {
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		return [year, month, day].join('-');
	}

	function checkDate (date) {
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

	function correctDate (date) {
		var splitDate = date.split('-');

		var year;
		var month;
		var day;

		splitDate.forEach(function (value, index) {
			if (Number(value) <= 12) {
				if (('' + value).length == 2) {
					month = '' + value;
				} else {
					month = '0' + value;

				}
				splitDate.splice(index, 1);	
			}
		});

		splitDate.forEach(function (value, index) {
			if (Number(value) <= 31) {
				if (('' + value).length == 2) {
					day = '' + value;
				} else {
					day = '0' + value;
				}
				splitDate.splice(index, 1);
			}
		});

		splitDate.forEach(function (value) {
			if (('' + value).length == 4) {
				year = '' + value;
			} else {
				year = '20' + value;
			}
		});

		return [year, month, day].join('-');
	}
}
module.exports = correctDate;

function correctDate (date) {
	var year;
	var month;
	var day;
	var splitEl;

	if ((date.match(/-/g) || []).length == 2) {
		splitEl = '-';
		date = date.replace(/ /g, '');
	} else if ((date.match(/ /g) || []).length == 2) {
		splitEl = ' ';
		date = date.replace(/,/g, '');
	} else {
		splitEl = ',';
	}

	var splitDate = date.split(splitEl);

	splitDate.forEach(function findMonthByWord (value, index) {
		var monthArr = ['january', 'february', 'march', 'april', 'may',
			'june', 'july', 'august', 'september', 'october', 'november', 'december'];

		if (!month && typeof value == 'string') {
			var indexMonth = monthArr.indexOf(value.toLowerCase()) + 1;
			if (indexMonth) {
				month = '0' + indexMonth;
				splitDate.splice(index, 1);	
			}
		}
	});

	splitDate.forEach(function findMonthByNum (value, index) {
		if (!month && Number(value) <= 12) {
			if (('' + value).length == 2) {
				month = '' + value;
			} else {
				month = '0' + value;
			}
			splitDate.splice(index, 1);	
		}
	});

	splitDate.forEach(function findDay (value, index) {
		if (!day && Number(value) <= 31) {
			if (('' + value).length == 2) {
				day = '' + value;
			} else {
				day = '0' + value;
			}
			splitDate.splice(index, 1);
		}
	});

	splitDate.forEach(function findYear (value) {
		if (!year && ('' + value).length == 4) {
			year = '' + value;
		} else {
			year = '20' + value;
		}
	});

	return [year, month, day].join('-');
}
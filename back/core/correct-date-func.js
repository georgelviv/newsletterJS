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

		var shortMonth = monthArr.map(function (value) {
			return value.slice(0, 3);
		});


		if (!month && typeof value == 'string') {
			var indexMonth = monthArr.indexOf(value.toLowerCase()) + 1;
			var indexShortMonth = shortMonth.indexOf(value.toLowerCase()) + 1;

			if (indexMonth) {
				month = '0' + indexMonth;
				splitDate.splice(index, 1);	
			} else if (indexShortMonth) {
				month = '0' + indexShortMonth;
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
		var valueCheck = value.replace(/[a-z]/gi, '');
		if (!day && Number(valueCheck) <= 31) {
			if (('' + valueCheck).length == 2) {
				day = '' + valueCheck;
			} else {
				day = '0' + valueCheck;
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
var EventEmitter = require('events').EventEmitter;
var SiteArticles = require('./site-articles-class');

module.exports = Articles;

function Articles() {
	var privateObj = {
		sitesArray: [],
		resData: [],
		ee: new EventEmitter(),
		isDataReady: false,
		isDataWaiting: false
	}

	this.addSite = addSite;
	this.getData = getData;
	this.init = init;

	function init () {
		privateObj.sitesArray.forEach(function (value, index) {
			value.site.init({
				ee: privateObj.ee,
				index: index
			});
		});
	}

	function getData (cb, params) {
		if (privateObj.isDataReady) {
			callbackData();
		} else {
			privateObj.ee.on('Data ready', function () {
				callbackData();
			});
		}

		function callbackData() {
			var sendData = Object.create(privateObj.resData);

			var sitesArray = [];

			privateObj.sitesArray.forEach(function (value) {
				sitesArray.push(value.siteName);
			});


			if (params.filter) {
				sendData = sendData.filter(function (value) {
					return params.filter == value.siteName;
				});
			}

			sendData.forEach(function (v, i) {
				v.indexData = sendData.length - i;
			});
			
			if (params.qty) {
				var qtyParams = params.qty.split('-');
				var firstParam = Number(qtyParams[0]);
				var secondParam = Number(qtyParams[1]);
				if (Number.isInteger(firstParam) && Number.isInteger(secondParam)) {
					sendData = sendData.slice(firstParam - 1, secondParam);
				} else if (Number.isInteger(Number(firstParam))) {
					sendData = sendData.slice(firstParam - 1, firstParam);
				}
			}

			cb(JSON.stringify({articles: sendData, sites: sitesArray}));
		}
	}

	function addSite (obj) {
		var site = new SiteArticles(obj);
		var index;
		privateObj.sitesArray.push({
			site: site,
			siteName: obj.siteName,
			isReady: false
		});
		index = privateObj.sitesArray.length - 1;
		privateObj.ee.on('data is ready ' + index, markReady);

		function markReady () {
			var siteData = site.getData();
			if (Array.isArray(siteData)) {
				siteData.forEach(function (value) {
					privateObj.resData.push(value);
				});
			} else {
				privateObj.resData.push(siteData);
			}

			privateObj.resData = sortByDate(privateObj.resData);
			privateObj.resData.forEach(function (v, i) {
				v.index = privateObj.resData.length - i;
			});

			privateObj.sitesArray[index].isReady = true;
			privateObj.ee.emit('Data ready');

			if (privateObj.sitesArray.every(checkIsReady)) {
				privateObj.isDataReady = true;
				console.log('Data loaded');
			}

			function checkIsReady (value) {
				return value.isReady;
			}
		}
	}

	function sortByDate(dataArray) {
		return dataArray.sort(function (a, b) {
			return compareDate(a.date, b.date);	
		});

		function compareDate(date1, date2) {
			var date1Array = date1.split('-');
			var date2Array = date2.split('-');
			for (var i = 0; i < date1Array.length; i++) {
				if (Number(date1Array[i]) > Number(date2Array[i])) {
					return -1;
				} else if (Number(date1Array[i]) < Number(date2Array[i])) {
					return 1;
				}
			}
			return 0;
		}
	}
}



var EventEmitter = require('events').EventEmitter;
var request = require('request');

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

	function getData (cb) {
		if (privateObj.isDataReady) {
			cb(JSON.stringify(privateObj.resData));
		} else {
			privateObj.ee.on('Data ready', function () {
				cb(JSON.stringify(privateObj.resData));
			});
		}
	}

	function addSite (obj) {
		var site = new SiteArticles(obj);
		var index;
		privateObj.sitesArray.push({
			site: site,
			isReady: false
		});
		index = privateObj.sitesArray.length - 1;
		privateObj.ee.on('data is ready ' + index, markReady);

		function markReady () {
			var siteData = site.getData();
			if (Array.isArray(siteData)) {
				siteData = siteData.reverse();
				siteData.forEach(function (value) {
					value.index = privateObj.resData.length + 1;
					privateObj.resData.push(value);
				});
				privateObj.resData = privateObj.resData.reverse();
			} else {
				privateObj.resData.push(siteData);
			}
			privateObj.sitesArray[index].isReady = true;
			privateObj.ee.emit('Data ready');

			if (privateObj.sitesArray.every(checkIsReady)) {
				privateObj.isDataReady = true;
			}

			function checkIsReady (value) {
				return value.isReady;
			}
		}
	}
}

function SiteArticles (obj) {
	var configObj = obj || {};
	var privateObj = {
		transformFunc: configObj.transformFunc || function (data) { return data; },
		configObj: {
			url: configObj.url || 'http://frontender.info/',
			method: 'GET',
			gzip: true,
			headers: {
				'User-Agent' : 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 ' +
				'(KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36'
			}
		},
		originObj: {
			data: new Buffer(''),
			response: {}
		},
		innerEE: new EventEmitter(),
		url: configObj.url || 'http://frontender.info/'
	}

	this.init = init;
	this.getData = getData;

	privateObj.innerEE.on('dataLoaded', transformData);
	privateObj.innerEE.on('dataTransformed', emitReady);

	function init (obj) {
		privateObj.publicEE = obj.ee;
		privateObj.publicEEmsg = 'data is ready ' + obj.index;
		requestData();
	}
	
	function requestData () {
		request.get(privateObj.configObj)
		.on('error', function (error) {
			console.log('Error: ' + error);
		})
		.on('data', function (chunk) {
			privateObj.originObj.data = Buffer.concat([new Buffer(privateObj.originObj.data) , new Buffer(chunk)]);
		})
		.on('response', function (responseObj) {
			privateObj.originObj.response = responseObj;
		})
		.on('end', function () {
			privateObj.originObj.data = privateObj.originObj.data.toString('utf-8');
			privateObj.innerEE.emit('dataLoaded');
		});
	}

	function emitReady () {
		privateObj.publicEE.emit(privateObj.publicEEmsg);
	}

	function transformData () {
		if (!privateObj.originObj.data) {
			console.log('Error, no current data loaded');
			return;
		}

		privateObj.transformDataObject = privateObj.transformFunc(privateObj.originObj.data);
		privateObj.innerEE.emit('dataTransformed');
	}

	function getData () {
		return privateObj.transformDataObject;
	}


}

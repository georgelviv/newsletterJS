var EventEmitter = require('events').EventEmitter;
var request = require('request');

module.exports = SiteArticles;

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
var EventEmitter = require('events').EventEmitter;
var requestData = require('./request-data');

module.exports = SiteArticles;

function SiteArticles (configObj) {
	if (!configObj || !configObj.url || !configObj.transformFunc) {
		var warningMsg = 'provide configObj with url and transformFunc params';
		console.log('Warning in SiteArticles: ' + warningMsg);
		return;
	}
	var privateObj = {
		innerEE: new EventEmitter()
	};
	
	this.init = init;
	this.getData = getData;

	function init (obj) {
		privateObj.publicEE = obj.ee;
		privateObj.publicEEmsg = 'data is ready ' + obj.index;
		requestData({
			url: configObj.url,
			transformFunc: configObj.transformFunc,
			cb: dataIsReady
		});
	}

	function dataIsReady (data) {
		privateObj.dataArray = data;
		if (false && isFunction(configObj.pages)) {
			var link = configObj.pages(originObj.data);
		}
		privateObj.publicEE.emit(privateObj.publicEEmsg);
	}

	function getData () {
		return privateObj.dataArray;
	}

	function isFunction(functionToCheck) {
		var getType = {};
		return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

}
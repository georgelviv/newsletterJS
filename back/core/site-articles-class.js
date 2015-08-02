var EventEmitter = require('events').EventEmitter;
var requestData = require('./request-data');
var articlePrepare = require('./article-prepare');

module.exports = SiteArticles;

function SiteArticles (configObj) {
	if (!configObj || !configObj.url || !configObj.transformFunc) {
		var warningMsg = 'provide configObj with url and transformFunc params';
		console.log('Warning in SiteArticles: ' + warningMsg);
		return;
	}
	var privateObj = {
		innerEE: new EventEmitter(),
		PAGE_LIMIT: 5,
		currentPage: 0,
		dataArray: []
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
		data.dataArray.forEach(function (value) {
			privateObj.dataArray.push(articlePrepare(value));
		})
		
		privateObj.currentPage++;
		if (isFunction(configObj.pages) && privateObj.currentPage < privateObj.PAGE_LIMIT) {
			nextPage(data.originPage);
		} else {
			privateObj.publicEE.emit(privateObj.publicEEmsg);
		}
	}

	function nextPage(data) {
		var link = fixAbsoluteLink(configObj.pages(data), configObj.site);

		requestData({
			url: link,
			transformFunc: configObj.transformFunc,
			cb: dataIsReady
		});	
	}

	function getData () {
		return privateObj.dataArray;
	}

	function isFunction(functionToCheck) {
		var getType = {};
		return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

	function fixAbsoluteLink (link, origin) {
		if (!link.match(/https?:\/\//) && origin !== 'No origin') {
			if (link[link.length - 1] == '/') {
				return link = origin + link.slice(1);
			} else {
				return link = origin + link;
			}
			
		}
		return link;
	}
}
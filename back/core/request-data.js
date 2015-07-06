var request = require('request');

module.exports = SitePage;

function SitePage (obj) {
	if (!obj && !obj.url && !obj.transformFunc && !obj.cb) {
		var warningMsg = 'no passed obj with url, transformFunc and cb params';
		console.log('Warning in SitePage: ' + warningMsg);
		return;
	}
	var requestObj = {
		url: obj.url ,
		method: 'GET',
		gzip: true,
		headers: {
			'User-Agent' : 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 ' +
			'(KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36'
		}
	};

	requestData(requestObj);

	function requestData (configObj) {
		var originData = new Buffer('');
		var resultData = {};
		var response;
		request.get(configObj)
		.on('error', function (error) {
			console.log('Error: ' + error);
		})
		.on('data', function (chunk) {
			originData = Buffer.concat([new Buffer(originData) , new Buffer(chunk)]);
		})
		.on('response', function (responseObj) {
			response = responseObj;
		})
		.on('end', function () {
			resultData.originPage = originData.toString('utf-8');
			resultData.dataArray = obj.transformFunc(resultData.originPage);
			obj.cb(resultData);
		});
	}
}
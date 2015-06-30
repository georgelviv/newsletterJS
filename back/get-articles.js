var request = require('request');
var handleArticles = require('./handle-articles');

module.exports = getArticles;

function getArticles(cb) {
	makeRequest('http://frontender.info/', cb);
}

function makeRequest(url, cb) {
	var configObj = {
		url: url,
		method: 'GET',
		gzip: true,
		headers: {
			'User-Agent' : 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36'
		}
	};

	var data = '';

	request.get(configObj)
	.on('error', function(error) {
		console.log('Error: ' + error);
		cb('Error:' + JSON.stringigy(error));
	})
	.on('data', function(chunk) {
		data += chunk;
	})
	.on('response', function(responseLink) {
	})
	.on('end', function() {
		handleArticles(data, cb);
	});

}

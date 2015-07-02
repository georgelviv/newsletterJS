var express = require('express');
var articles = require('./back/articles-instance');
var config = require('./configuration.json');

var app = express();
var port = process.argv[2] || config.port;

app.use(express.static(config.buildDir + '/'));

app.get('/', function (req, res) {
	res.sendFile(config.buildDir + '/' + config.startIndex);
});

app.get('/last', function (req, res) {
	articles.getData(function (data) {
		res.send(data);
	});
});

var server = app.listen(port, function listenPort() {
	console.log('Listen on port:' + server.address().port);
});

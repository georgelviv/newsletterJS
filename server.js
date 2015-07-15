var express = require('express');
var articles = require('./back/articles-instance');
var config = require('./configuration.json');

var app = express();
var port = process.argv[2] || config.port;

app.use(express.static(config.buildDir + '/'));

app.get('/', function (req, res) {
	res.sendFile(config.buildDir + '/' + config.startIndex);
});

app.get('/articles', function (req, res) {
	articles.getData(function (data) {
		res.send(data);
	});
});

app.get('/articles/:articleId', function (req, res) {
	articles.getData(function (data) {
		res.send(data);
	}, req.params.articleId);
});

app.use(function(req, res){
	res.redirect('/#/404');
});

var server = app.listen(port, function listenPort() {
	console.log('Listen on port:' + server.address().port);
});

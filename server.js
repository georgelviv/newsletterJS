var express = require('express');
var path = require('path');
var config = require('./configuration.json');

var app = express();
var port = process.argv[2] || config.port;

app.use(express.static(config.buildDir + '/'));

app.get('/', function (req, res) {
	res.sendFile(config.buildDir + '/' + config.startIndex);
});

var server = app.listen(port, function listenPort() {
	console.log('Listen on port:' + server.address().port);
});
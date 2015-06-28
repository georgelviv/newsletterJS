var express = require('express');
var path = require('path');
var configuration = require('./configuration.json');

var app = express();
var port = process.argv[2] || configuration.port;

app.use(express.static(configuration.buildDir + '/'));

app.get('/', function (req, res) {
	res.send('work');
});

var server = app.listen(port, function listenPort() {
	console.log('Listen on port:' + server.address().port);
});
var cheerio = require('cheerio');
var Articles = require('./articles-class');

var articles = new Articles();

articles.addSite({
	url: 'http://frontender.info/',
	transformFunc: frontenderTrasnform
});

articles.init();

module.exports = articles;

function frontenderTrasnform(data) {
	var $ = cheerio.load(data);
	var resObj = {};
	resObj.data = $('.articles').html();
	return resObj;
}



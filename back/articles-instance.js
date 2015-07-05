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
	var resArr = [];
	$('.articles article').each(function () {
		var article = $(this);
		var title = clearNewLine(article.find('h2').text());
		var description = '';
		var link = 'http://frontender.info' + article.find('h2 a').attr('href');
		article.find('p').each(function () {
			description += clearNewLine($(this).text()) + '\n';
		});
		resArr.push({
			title: title,
			description: description,
			link: link
		});
	}).html();
	return resArr;

	function clearNewLine(string) {
		return string.replace(/\n/g, '');
	}
}



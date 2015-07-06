var cheerio = require('cheerio');
var site = 'http://frontender.info';

var frontenderObj = {
	url: site + '/',
	transformFunc: frontenderTrasnform
};

module.exports = frontenderObj;

function frontenderTrasnform(data) {
	var $ = cheerio.load(data);
	var resArr = [];
	$('.articles article').each(function () {

		var article = $(this);
		var title = clearNewLine(article.find('h2').text());
		var description = '';
		var link = site + article.find('h2 a').attr('href');
		var date = article.find('footer time').attr('datetime');

		article.find('p').each(function () {
			description += clearNewLine($(this).text()) + '\n';
		});
		resArr.push({
			origin: site + '/',
			title: title,
			description: description,
			link: link,
			date: date
		});
	});
	return resArr;

	function clearNewLine(string) {
		return string.replace(/\n/g, '');
	}
}
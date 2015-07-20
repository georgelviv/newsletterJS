var cheerio = require('cheerio');
var site = 'http://frontender.info';

var frontenderObj = {
	siteName: site,
	url: site + '/',
	transformFunc: frontenderTrasnform
};

module.exports = frontenderObj;

function frontenderTrasnform(data) {
	var $ = cheerio.load(data);
	var resArr = [];
	$('.articles article').each(function () {

		var article = $(this);
		var title = article.find('h2').text();
		var description = article.find('p').text();
		var link = article.find('h2 a').attr('href');
		var date = article.find('footer time').attr('datetime');

		resArr.push({
			origin: site + '/',
			title: title,
			description: description,
			link: link,
			date: date
		});
	});

	return resArr;
}
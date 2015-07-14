var cheerio = require('cheerio');
var site = 'http://tutorialzine.com';

var tutorialzineObj = {
	url: site + '/posts/',
	transformFunc: tutorialzineTrasnform,
	pages: linkToNextPage
};

module.exports = tutorialzineObj;

function linkToNextPage(data) {
	var $ = cheerio.load(data);
	return $('.wp-pagenavi a.nextpostslink').attr('href');
}

function tutorialzineTrasnform(data) {
	var $ = cheerio.load(data);
	var resArr = [];
	$('#content article.post-item').each(function () {
		var article = $(this);
		var title = article.find('h3 a').text();
		var description = article.find('p').text();
		var link = article.find('h3 a').attr('href');
		var date = article.find('time').attr('datetime');

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
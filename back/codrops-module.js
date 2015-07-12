var cheerio = require('cheerio');
var site = 'http://tympanus.net/codrops';

var codropsObj = {
	url: site + '/category/tutorials/',
	transformFunc: codropsTrasnform,
	pages: linkToNextPage
};

module.exports = codropsObj;

function linkToNextPage(data) {
	var $ = cheerio.load(data);
	return $('#wp_page_numbers li').last().find('a').attr('href');
}

function codropsTrasnform(data) {
	var $ = cheerio.load(data);
	var resArr = [];
	$('.ct-archive-container article').each(function () {
		var article = $(this);
		var title = article.find('h3 a').text();
		var description = article.find('p.ct-feat-excerpt').text();
		var link = site + article.find('h3 a').attr('href');
		var date = article.find('.ct-subline time').text();

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
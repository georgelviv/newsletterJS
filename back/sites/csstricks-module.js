var cheerio = require('cheerio');
var site = 'https://css-tricks.com';
var siteName = 'css-tricks.com';

var cssTricksObj = {
	siteName: siteName,
	site: site,
	url: site + '/archives/',
	transformFunc: cssTricksTrasnform,
	pages: linkToNextPage
};

module.exports = cssTricksObj;

function linkToNextPage(data) {
	var $ = cheerio.load(data);
	return $('#wp_page_numbers li').last().find('a').attr('href');
}

function cssTricksTrasnform(data) {
	var $ = cheerio.load(data);
	var resArr = [];
	$('.archive-wrap article.sitemap-article').each(function () {
		var article = $(this);
		var title = article.find('h4 .sitemap-title').text();
		var description = article.find('.sitemap-excerpt').text();
		var link = article.find('h4 .sitemap-title').attr('href');
		var date = article.find('.sitemap-meta time').text();

		resArr.push({
			siteName: siteName,
			origin: site + '/',
			title: title,
			description: description,
			link: link,
			date: date
		});
	});

	return resArr;
}
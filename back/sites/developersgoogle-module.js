var cheerio = require('cheerio');
var site = 'https://developers.google.com';
var siteName = 'developers.google.com';

var developersGoogleObj = {
	siteName: siteName,
	site: site,
	url: site + '/web/updates/',
	transformFunc: developersGoogleTrasnform,
	pages: linkToNextPage
};

module.exports = developersGoogleObj;

function linkToNextPage(data) {
	var $ = cheerio.load(data);
	return $('.updates-pagination .next').find('a').attr('href');
}

function developersGoogleTrasnform(data) {
	var $ = cheerio.load(data);
	var resArr = [];
	$('.updates-list-header .update-card').each(function () {
		var article = $(this);
		var title = article.find('h3').text();
		var description = article.find('.description').text();
		var link = article.children('a').attr('href');
		var date = article.find('footer div').last().text();

		resArr.push({
			origin: site + '/',
			siteName: siteName,
			title: title,
			description: description,
			link: link,
			date: date
		});
	});

	return resArr;
}
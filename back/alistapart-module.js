var cheerio = require('cheerio');
var site = 'http://alistapart.com';

var alistapartObj = {
	url: site + '/articles',
	transformFunc: alistapartTrasnform,
	pages: linkToNextPage
};

module.exports = alistapartObj;

function linkToNextPage(data) {
	var $ = cheerio.load(data);
	return $('article.main-content .paginator .previous').attr('href');
}

function alistapartTrasnform(data) {
	var $ = cheerio.load(data);
	var resArr = [];
	$('article.main-content .entry-list').each(function () {
		$(this).find('li').each(function () {
			var article = $(this);
			var title = article.find('h3.entry-title').text();
			var description = article.find('p').not('.meta').text();
			var link = site + article.find('h3.entry-title a').attr('href');
			var date = article.find('time.pubdate').attr('datetime').split('T')[0];

			resArr.push({
				origin: site + '/',
				title: title,
				description: description,
				link: link,
				date: date
			});
		});
	});

	return resArr;
}
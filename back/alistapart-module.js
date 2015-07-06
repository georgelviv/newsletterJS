var cheerio = require('cheerio');
var site = 'http://alistapart.com';

var alistapartObj = {
	url: site + '/articles',
	transformFunc: alistapartTrasnform
};

module.exports = alistapartObj;

function alistapartTrasnform(data) {
	var $ = cheerio.load(data);
	var resArr = [];
	$('article.main-content .entry-list').each(function () {
		$(this).find('li').each(function () {
			var article = $(this);
			var title = clearNewLine(article.find('h3.entry-title').text());
			var description = clearNewLine(article.find('p').not('.meta').text());
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

	function clearNewLine(string) {
		return string.replace(/\n/g, '');
	}
}
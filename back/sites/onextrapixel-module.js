var cheerio = require('cheerio');
var site = 'http://www.onextrapixel.com';

var onextrapixelObj = {
	url: site,
	transformFunc: onextrapixelTrasnform,
	pages: linkToNextPage
};

module.exports = onextrapixelObj;

function linkToNextPage(data) {
	var $ = cheerio.load(data);
	return $('.wp-pagenavi a.nextpostslink').attr('href');
}

function onextrapixelTrasnform(data) {
	var $ = cheerio.load(data);
	var resArr = [];
	$('.content .post').each(function () {
		var article = $(this);
		var title = article.find('h2.post__title a').text();
		var description = article.find('.post__excerpt p').text();
		var link = article.find('h2.post__title a').attr('href');
		var date = article.find('.post__date').text();

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
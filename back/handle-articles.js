var cheerio = require('cheerio');

module.exports = handleArticles;

function handleArticles(data, cb) {
	var $ = cheerio.load(data);
	cb($('.articles').html());
}


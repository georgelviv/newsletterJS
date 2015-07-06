var Articles = require('./articles-class');

var articles = new Articles();

articles.addSite(
	require('./frontender-module')
);
articles.addSite(
	require('./alistapart-module')
);


articles.init();

module.exports = articles;





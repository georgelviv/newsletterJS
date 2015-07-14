var Articles = require('./core/articles-class');

var articles = new Articles();

articles.addSite(
	require('./frontender-module')
);
articles.addSite(
	require('./alistapart-module')
);
articles.addSite(
	require('./codrops-module')
);
articles.addSite(
	require('./tutorialzine-module')
);


articles.init();

module.exports = articles;





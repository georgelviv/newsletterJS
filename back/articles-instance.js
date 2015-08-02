var Articles = require('./core/articles-class');

var articles = new Articles();

articles.addSite(
	require('./sites/frontender-module')
);
articles.addSite(
	require('./sites/alistapart-module')
);
articles.addSite(
	require('./sites/codrops-module')
);
articles.addSite(
	require('./sites/tutorialzine-module')
);
articles.addSite(
	require('./sites/onextrapixel-module')
);
articles.addSite(
	require('./sites/csstricks-module')
);


articles.init();

module.exports = articles;





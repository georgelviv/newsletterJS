(function tplModule () { 'use strict'; window.$_$.registerModule({name: 'templates',api: {"articles.tpl":"<div class=\"main__navigation\">\r\n\t<a class=\"main__navigation__button main__navigation__button--prev\" data-add-attr=\"href, prevPageLink\" \r\n\t\tdata-add-class-if-not=\"prevPage, main__navigation__button--disable\" title=\"Go to previously page\">\r\n\t\tPrev\r\n\t</a>\r\n\t<a class=\"main__navigation__button main__navigation__button--next\" data-add-attr=\"href, nextPageLink\" \r\n\t\tdata-add-class-if-not=\"nextPage, main__navigation__button--disable\" title=\"Go to next page\">\r\n\t\tNext\r\n\t</a>\r\n</div>\r\n<div class=\"main__content\">\r\n\t<article class=\"main__article\" data-repeat=\"articles\">\r\n\t\t<h2 data-value=\"item.title\"></h2>\r\n\t\t<p class=\"article__paragraph\" data-value=\"item.description\"></p>\r\n\t\t<aside class=\"article__aside\">\r\n\t\t\t<a class=\"article__aside__link\" target=\"_blank\" data-value=\"item.origin\" data-add-attr=\"href, item.origin\" \r\n\t\t\t\ttitle=\"read more\">\r\n\t\t\t</a>\r\n\t\t\t<a class=\"article__aside__link\" target=\"_blank\" data-add-attr=\"href, item.link\" title=\"read more\">\r\n\t\t\t\tRead more\r\n\t\t\t</a>\r\n\t\t</aside>\r\n\t\t<footer class=\"article__footer\">\r\n\t\t\t<time class=\"article__footer__datetime\" data-add-attr=\"datetime, item.date\" \r\n\t\t\t\tdata-value=\"item.date\"></time>\r\n\t\t\t<span class=\"article__footer__index\" data-value=\"item.index\"></span>\r\n\t\t</footer>\r\n\t</article>\r\n</div>\r\n<div class=\"main__navigation\">\r\n\t<a class=\"main__navigation__button main__navigation__button--prev\" data-add-attr=\"href, prevPageLink\" \r\n\t\tdata-add-class-if-not=\"prevPage, main__navigation__button--disable\" title=\"Go to previously page\">\r\n\t\tPrev\r\n\t</a>\r\n\t<a class=\"main__navigation__button main__navigation__button--next\" data-add-attr=\"href, nextPageLink\" \r\n\t\tdata-add-class-if-not=\"nextPage, main__navigation__button--disable\" title=\"Go to next page\">\r\n\t\tNext\r\n\t</a>\r\n</div>"}}); })();
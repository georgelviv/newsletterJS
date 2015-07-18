<h1 class="main__heading">Latest articles</h1>
<div class="main__navigation">
	<a class="navigation__button navigation__button--prev" data-add-attr="href, prevPageLink" 
		data-add-class-if-not="prevPage, navigation__button--disable" title="Go to previously page">
		<i class="fa fa-angle-left"></i> Prev
	</a>
	<a class="navigation__button navigation__button--next" data-add-attr="href, nextPageLink" 
		data-add-class-if-not="nextPage, navigation__button--disable" title="Go to next page">
		Next <i class="fa fa-angle-right"></i>
	</a>
	<div class="navigation__page">
		Current page <span class="navigation__page__current" data-value="pageCurrent"></span>
	</div>
</div>
<div class="main__content">
	<article class="main__article" data-repeat="articles">
		<h2 class="article__title" data-value="item.title"></h2>
		<p class="article__paragraph" data-value="item.description"></p>
		<aside class="article__aside">
			<a class="article__aside__link" target="_blank" data-value="item.origin" data-add-attr="href, item.origin" 
				title="read more">
			</a>
			<a class="article__aside__link" target="_blank" data-add-attr="href, item.link" title="read more">
				Read more
			</a>
		</aside>
		<footer class="article__footer">
			<time class="article__footer__datetime" data-add-attr="datetime, item.date" 
				data-value="item.date"></time>
			<span class="article__footer__index" data-value="item.index"></span>
		</footer>
	</article>
</div>
<div class="main__navigation">
	<a class="navigation__button navigation__button--prev" data-add-attr="href, prevPageLink" 
		data-add-class-if-not="prevPage, navigation__button--disable" title="Go to previously page">
		<i class="fa fa-angle-left"></i> Prev
	</a>
	<a class="navigation__button navigation__button--next" data-add-attr="href, nextPageLink" 
		data-add-class-if-not="nextPage, navigation__button--disable" title="Go to next page">
		Next <i class="fa fa-angle-right"></i>
	</a>
	<div class="navigation__page">
		Current page <span class="navigation__page__current" data-value="pageCurrent"></span>
	</div>
</div>
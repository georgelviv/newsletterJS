<div class="main__navigation">
	<a class="main__navigation__button main__navigation__button--prev" data-add-attr="href, prevPageLink" 
		data-add-class-if-not="prevPage, main__navigation__button--disable" title="Go to previously page">
		Prev
	</a>
	<a class="main__navigation__button main__navigation__button--next" data-add-attr="href, nextPageLink" 
		data-add-class-if-not="nextPage, main__navigation__button--disable" title="Go to next page">
		Next
	</a>
</div>
<div class="main__content">
	<article class="main__article" data-repeat="articles">
		<h2 data-value="item.title"></h2>
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
	<a class="main__navigation__button main__navigation__button--prev" data-add-attr="href, prevPageLink" 
		data-add-class-if-not="prevPage, main__navigation__button--disable" title="Go to previously page">
		Prev
	</a>
	<a class="main__navigation__button main__navigation__button--next" data-add-attr="href, nextPageLink" 
		data-add-class-if-not="nextPage, main__navigation__button--disable" title="Go to next page">
		Next
	</a>
</div>
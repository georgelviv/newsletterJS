<div class="main__navigation">
	<a class="main__navigation__prev" data-add-attr="href, prevPageLink" data-add-class-if-not="prevpage" 
		title="Go to previously page">
		Prev
	</a>
	<a class="main__navigation__next" data-add-attr="href, nextPageLink" data-add-class-if-not="nextpage" 
		title="Go to next page">
		Next
	</a>
</div>
<div class="main__content">
	<article class="main__article" data-repeat="articles">
		<h2 data-value="item.title"></h2>
		<p class="article__paragraph" data-value="item.description"></p>
		<footer class="article__footer">
			<time class="article__footer__datetime" data-add-attr="datetime, item.date" 
				data-value="item.date"></time>
			<span class="article__footer__index" data-value="item.index"></span>
		</footer>
	</article>
</div>
<div class="main__navigation">
	<a class="main__navigation__prev" data-add-attr="href, prevPageLink" data-add-class-if-not="prevpage" 
		title="Go to previously page">
		Prev
	</a>
	<a class="main__navigation__next" data-add-attr="href, nextPageLink" data-add-class-if-not="nextpage" 
		title="Go to next page">
		Next
	</a>
</div>
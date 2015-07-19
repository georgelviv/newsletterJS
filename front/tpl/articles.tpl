<h1 class="main__heading">Latest articles</h1>

<div data-include-template="navigation.tpl"></div>

<div class="main__content">
	<article class="main__article" data-repeat="articles">
		<h2 class="article__title" data-value="item.title"></h2>
		<div class="article__content">
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
				<div class="article__footer__datetime-wrapper">
					<i class="fa fa-calendar"></i>
					<time class="article__footer__datetime" data-add-attr="datetime, item.date" 
					data-value="item.date"></time>
				</div>
				<span class="article__footer__index" data-value="item.index"></span>
			</footer>
		</div>
	</article>
</div>

<div data-include-template="navigation.tpl"></div>

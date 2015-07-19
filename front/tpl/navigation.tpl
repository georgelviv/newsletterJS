<div class="main__navigation">
	<div class="main__navigation__left" data-add-class-if-not="prevPage, main__navigation__left--disable">
		<a class="navigation__button" href="/#/articles/1"
				title="Go to first page">
			<i class="fa fa-angle-double-left"></i>
		</a>
		<a class="navigation__button" data-add-attr="href, prevPageLink" 
				title="Go to previously page">
			<i class="fa fa-angle-left"></i> Prev
		</a>
	</div>
	<div class="main__navigation__right" data-add-class-if-not="nextPage, main__navigation__right--disable">
		<a class="navigation__button" data-add-attr="href, nextPageLink" 
			title="Go to next page">
			Next <i class="fa fa-angle-right"></i>
		</a>
		<a class="navigation__button" data-add-attr="href, lastPageLink" 
				title="Go to last page">
			<i class="fa fa-angle-double-right"></i>
		</a>
	</div>
	<div class="navigation__page">
		Current page <span class="navigation__page__current" data-value="pageCurrent"></span>
	</div>
</div>
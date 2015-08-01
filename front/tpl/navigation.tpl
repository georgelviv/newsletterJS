<div class="navigation">
	<div class="navigation__block navigation__block--left" data-add-class-if-not="prevPage, navigation__block--disable">
		<a class="navigation__button" data-add-attr="href, firstPageLink" data-tabindex="prevPage"
				title="Go to first page">
			<i class="fa fa-angle-double-left"></i>
		</a>
		<a class="navigation__button" data-add-attr="href, prevPageLink" data-tabindex="prevPage"
				title="Go to previously page">
			<i class="fa fa-angle-left"></i> Prev
		</a>
	</div>
	<div class="navigation__block navigation__block--right" data-add-class-if-not="nextPage, navigation__block--disable">
		<a class="navigation__button" data-add-attr="href, nextPageLink" data-tabindex="nextPage"
			title="Go to next page">
			Next <i class="fa fa-angle-right"></i>
		</a>
		<a class="navigation__button" data-add-attr="href, lastPageLink" data-tabindex="nextPage"
				title="Go to last page">
			<i class="fa fa-angle-double-right"></i>
		</a>
	</div>
	<div class="navigation__page">
		Current page <span class="navigation__page__current" data-value="pageCurrent"></span>
	</div>
</div>
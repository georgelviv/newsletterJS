<div class="page-settings">
	<button class="page-settings__expand-btn" title="Show/Hide page settings">
		<span class="hidden-text">Show/Hide page settings</span> <i class="fa fa-cog"></i>
	</button>
	<div class="page-settings__content">
		<h3 class="page-settings__content__heading">Page settings</h3>
		<div class="page-settings__select">
			<div class="page-settings__select__arrow">
				<i class="fa fa-caret-down"></i>
			</div>
			<select class="page-settings__select__tag page-settings__select__tag--filter" name="filter">
				<option value="" selected disabled>Select filter</option>
				<option data-repeat="sites" data-value="item." data-add-attr="value, item."></option>
			</select>
			<select class="page-settings__select__tag page-settings__select__tag--qty" name="qty">
				<option value="" selected disabled>Select qty</option>
				<option value="5">5</option>
				<option value="10">10</option>
				<option value="25">25</option>
				<option value="50">50</option>
				<option value="100">100</option>
			</select>
		</div>
		<button class="page-settings__content__apply-btn" title="Apply changes">
			<span class="hidden-text">Apply changes</span> <i class="fa fa-rocket"></i>
		</button>
	</div>
</div>

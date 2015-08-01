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
			<select class="page-settings__select__tag page-settings__select__tag--filter" name="filter" 
				data-tabindex="pageSettgingsIsActive">
				<option value="" selected>Select filter</option>
				<option data-repeat="sites" data-value="item." data-add-attr="value, item."></option>
			</select>
		</div>
		<button class="page-settings__content__apply-btn" title="Apply changes" data-tabindex="pageSettgingsIsActive">
			<span class="hidden-text">Apply changes</span> <i class="fa fa-rocket"></i>
		</button>
	</div>
</div>

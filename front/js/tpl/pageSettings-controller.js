(function pageSettingsController () {
	'use strict';

	window.$_$.addModuleApi('templates', {
		'page-settings.tpl': {
			controller: {
				func: controller,
				multiply: false
			}
		}
	});

	function controller (router) {
		var domEl = {
			pageSettingsNode: firtsByClassName('page-settings'),
			expandBtnNode: firtsByClassName('page-settings__expand-btn'),
			filterSelect: firtsByClassName('page-settings__select__tag--filter'),
			qtySelect: firtsByClassName('page-settings__select__tag--qty'),
			applyBtn: firtsByClassName('page-settings__content__apply-btn')
		};

		var isSelectedSet = false;

		domEl.expandBtnNode.addEventListener('click', toggleOpenPageSettings, false);
		domEl.applyBtn.addEventListener('click', applyBtnHandler, false);

		settingsIsOpen();

		function setSelectedFilter () {
			if (isSelectedSet) return;

			var filter = router.getConfig('filter');
			var qty = router.getConfig('qty');
			var getElemntsByAttributeValue = $_$.getModuleApi('utils', 'getElemntsByAttributeValue');

			if (filter) {
				var optionsFilter = getElemntsByAttributeValue('value', filter, domEl.filterSelect);
				if (optionsFilter) {
					optionsFilter.setAttribute('selected', 'selected');
					isSelectedSet = true;
				}
			}
			if (qty) {
				var optionsQty = getElemntsByAttributeValue('value', qty, domEl.qtySelect);
				if (optionsQty) {
					optionsQty.setAttribute('selected', 'selected');
					isSelectedSet = true;
				}
			}
		}

		function toggleOpenPageSettings () {
			($_$.getModuleApi('utils', 'toggleClass'))(domEl.pageSettingsNode, 'page-settings--open');
			settingsIsOpen();
			setSelectedFilter();
		}

		function settingsIsOpen () {
			var itemsArray = [domEl.applyBtn, domEl.filterSelect, domEl.qtySelect];
			if (($_$.getModuleApi('utils', 'hasClass'))(domEl.pageSettingsNode, 'page-settings--open')) {
				itemsArray.forEach(function (value) {
					value.removeAttribute('tabindex');
				}); 
			} else {
				itemsArray.forEach(function (value) {
					value.setAttribute('tabindex', -1);
				});
			}
		}

		function applyBtnHandler () {
			var filter = domEl.filterSelect.value;
			var qty = domEl.qtySelect.value;
			var paramsArray = [];
			var resLink = '/#/articles';

			if (filter && filter !== 'All') {
				paramsArray.push('filter=' +  filter);
			}

			if (qty) {
				paramsArray.push('qty=' +  qty);
			}

			if (paramsArray.length) {
				resLink += '?' + paramsArray.join('&');
			}

			location.href = location.origin + resLink;
		}

		function firtsByClassName(className) {
			return document.getElementsByClassName(className)[0];
		}
	}

})();
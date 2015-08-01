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
			applyBtn: firtsByClassName('page-settings__content__apply-btn')
		};

		var isSelectedSet = false;

		domEl.expandBtnNode.addEventListener('click', toggleOpenPageSettings, false);
		domEl.applyBtn.addEventListener('click', applyBtnHandler, false);

		settingsIsOpen();

		function setSelectedFilter () {
			var filter = router.getConfig('filter');
			var getElemntsByAttributeValue = $_$.getModuleApi('utils', 'getElemntsByAttributeValue');
			if (filter && !isSelectedSet) {
				var options = getElemntsByAttributeValue('value', filter, domEl.filterSelect);
				if (options) {
					options.setAttribute('selected', 'selected');
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
			if (($_$.getModuleApi('utils', 'hasClass'))(domEl.pageSettingsNode, 'page-settings--open')) {
				domEl.applyBtn.removeAttribute('tabindex');
				domEl.filterSelect.removeAttribute('tabindex');
			} else {
				domEl.applyBtn.setAttribute('tabindex', -1);
				domEl.filterSelect.setAttribute('tabindex', -1);
			}
		}

		function applyBtnHandler () {
			var filter = domEl.filterSelect.value;
			if (filter) {
				if (filter !== 'All') {
					location.href = location.origin + '/#/articles?filter=' +  filter;
				} else {
					location.href = location.origin + '/#/articles';
				}
			}
		}

		function firtsByClassName(className) {
			return document.getElementsByClassName(className)[0];
		}
	}

})();
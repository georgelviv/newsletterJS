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

		domEl.expandBtnNode.addEventListener('click', toggleOpenPageSettings, false);
		domEl.applyBtn.addEventListener('click', applyBtnHandler, false);

		settingsIsOpen();

		function toggleOpenPageSettings () {
			($_$.getModuleApi('utils', 'toggleClass'))(domEl.pageSettingsNode, 'page-settings--open');
			settingsIsOpen();
		}

		function settingsIsOpen () {
			console.log(($_$.getModuleApi('utils', 'hasClass'))(domEl.pageSettingsNode, 'page-settings--open'));
			if (($_$.getModuleApi('utils', 'hasClass'))(domEl.pageSettingsNode, 'page-settings--open')) {
				router.setConfig('pageSettgingsIsActive', false);
			} else {
				router.setConfig('pageSettgingsIsActive', true);
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
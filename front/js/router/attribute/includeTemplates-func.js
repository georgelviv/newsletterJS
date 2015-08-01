(function includeTemplates () {

	window.$_$.registerModule({
		name: 'renderAttribute',
		api: {
			includeTemplate: includeTemplate
		}
	});

	var getElemntsByAttribute = $_$.getModuleApi('utils', 'getElemntsByAttribute');
	var isFunction = $_$.getModuleApi('utils', 'isFunction');

	function includeTemplate (router, Node) {
		var attrIncludeTemplate = getElemntsByAttribute('data-include-template', Node);
		Array.prototype.forEach.call(attrIncludeTemplate, function (tagNode) {
			var templateName = tagNode.getAttribute('data-include-template');
			var needRender = !tagNode.getAttribute('data-template-is-render');
			var needExecute = !tagNode.getAttribute('data-controller-is-executed');
			var template = $_$.getModuleApi('templates', templateName);

			if (template && needRender) {
				tagNode.innerHTML = template.content;
				tagNode.setAttribute('data-template-is-render', true);
			}
			if (needExecute && template.controller && isFunction(template.controller.func)) {
				template.controller.func(router);
				if (!template.controller.multiply) {
					tagNode.setAttribute('data-controller-is-executed', true);
				}
			}
		});
	}


})();
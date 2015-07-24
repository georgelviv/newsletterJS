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
			var template = $_$.getModuleApi('templates', templateName);

			if (template && needRender) {
				tagNode.innerHTML = template.content;
				tagNode.setAttribute('data-template-is-render', true);
			}
			if (isFunction(template.controller)) {
				template.controller(router);
			}
		});
	}


})();
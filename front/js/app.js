(function app() {

	window.$_$.getRequest('/last', lastCb);

	function lastCb(data) {
		document.body.innerHTML = data;
	}

})();
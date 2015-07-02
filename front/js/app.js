(function app() {

	var statusValueDom = document.getElementsByClassName('status__value')[0];
	statusValueDom.innerHTML = 'loading';

	window.$_$.getRequest('/last', lastCb);

	function lastCb(data) {
		var contentDom = document.getElementsByClassName('main__content')[0];
		console.log(data);
		contentDom.innerHTML = data;
		statusValueDom.innerHTML = 'ready';
	}

})();
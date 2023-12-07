var showNotification = function () {
	var notification = document.getElementsByClassName(
		"securityNotification"
	)[0];
	if (notification) {
		notification.style.display = "block";
	}
};

var hideNotification = function () {
	var notification = document.getElementsByClassName(
		"securityNotification"
	)[0];
	if (notification) {
		notification.style.display = "none";
	}
};

var observerCallback = function (mutationsList, observer) {
	mutationsList.forEach((mutation) => {
		mutation.addedNodes.forEach((node) => {
			if (node.nodeType === 1) {
				var isIntentional = node?.classList.contains(
					"self-html-injection"
				);

				if (!isIntentional) {
					fetch("/en/test", {
						method: "POST",
						body: "security alert triggered",
					});
					node?.parentNode.removeChild(node);
					showNotification();
				}
			}
		});
	});
};

var observer = new MutationObserver(observerCallback);

observer.observe(document.documentElement, { childList: true, subtree: true });

// TODO: finish implementationr56
window.onload = async () => {
	// Register service worker
	if ("serviceWorker" in navigator && document.URL.split(":")[0] !== "file") {
		navigator.serviceWorker.register("/static/JS/sw.js");
	}
	// Reload page once to resolve any network issues
	var reloaded = sessionStorage.getItem("reloaded");
	if (reloaded == "false" || !reloaded) {
		sessionStorage.setItem("reloaded", "true");
		location.reload();
	}

	// Load buttons
	// var navButtons = document.getElementById("navButtons");

	var userStatusRaw = await fetch("/server/api/user/account/status");
	var userStatus = await userStatusRaw.json();

	// console.log(userStatus);
};

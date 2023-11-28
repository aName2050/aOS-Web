window.onload = async () => {
	// Reload page once to resolve any network issues
	var reloaded = sessionStorage.getItem("reloaded");
	if (reloaded == "false" || !reloaded) {
		sessionStorage.setItem("reloaded", "true");
		location.reload();
	}

	// Load buttons
	var navButtons = document.getElementById("navButtons");

	var userStatusRaw = await fetch("/server/api/user/account/status");
	var userStatus = await userStatusRaw.json();

	console.log(userStatus);
};

window.addEventListener("scroll", function () {
	var elementTarget = document.getElementById("mainHeader");
	if (window.scrollY > elementTarget.offsetTop + elementTarget.offsetHeight) {
		alert("You've scrolled past the second div");
	}
});

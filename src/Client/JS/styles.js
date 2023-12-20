// Navbar box shadow only appears when scrolling far enough down
// the page to cover an element
window.addEventListener("scroll", function () {
	var header = document.getElementById("main");
	var navbar = document.getElementById("navbar");
	if (window.scrollY + header.style.height > header.offsetHeight) {
		navbar.classList.add("navbar-shadow");
	} else {
		navbar.classList.remove("navbar-shadow");
	}
});

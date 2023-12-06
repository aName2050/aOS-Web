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

function handleMediaSize(media) {
	// TODO: finish implementation
	console.log(`${media}`);
	if (media.matches) {
		var replaceableElement = document.getElementsByClassName("replaceable");
		replaceableElement[0].classList.remove("replaceable");
		replaceableElement[1].classList.add("replaceable");
	} else {
		var replaceableElement = document.getElementsByClassName("replaceable");
		replaceableElement[1].classList.remove("replaceable");
		replaceableElement[0].classList.add("replaceable");
	}
}

var media = window.matchMedia("(max-width: 500px)");

handleMediaSize(media);

media.addEventListener("change", function () {
	handleMediaSize(media);
});

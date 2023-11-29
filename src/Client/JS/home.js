window.onload = async () => {
    // Reload page once to resolve any network issues
    var reloaded = sessionStorage.getItem('reloaded');
    if (reloaded == 'false' || !reloaded) {
        sessionStorage.setItem('reloaded', 'true');
        location.reload();
    }

    // Load buttons
    // var navButtons = document.getElementById("navButtons");

    var userStatusRaw = await fetch('/server/api/user/account/status');
    var userStatus = await userStatusRaw.json();

    console.log(userStatus);
};

// Navbar box shadow only appears when scrolling far enough down
// the page to cover an element
window.addEventListener('scroll', function () {
    var header = document.getElementById('mainHeader');
    var navbar = document.getElementById('navbar');
    if (window.scrollY + header.style.height > header.offsetHeight) {
        navbar.classList.add('navbar-shadow');
    } else {
        navbar.classList.remove('navbar-shadow');
    }
});

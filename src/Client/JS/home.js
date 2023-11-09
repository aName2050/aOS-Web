window.onscroll = () => {
    var navbar = document.getElementById('navbar');

    if (navbar) {
        var sticky = navbar.offsetTop;

        if (window.scrollY >= sticky) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    }
};

window.onload = () => {
    var navButtons = document.getElementById('navButtons');

    var signedOut = true;

    if (signedOut) {
        var demoButton = createButton('Demo');
        var loginButton = createButton('Login');
        var signUpButton = createButton('Sign Up');
        navButtons.appendChild(demoButton);
        navButtons.appendChild(loginButton);
        navButtons.appendChild(signUpButton);
    } else {
        var loadOSButton = createButton('Load OS');
        var accountButton = createButton('Account');
        var signOutButton = createButton('Sign Out');
        navButtons.appendChild(loadOSButton);
        navButtons.appendChild(accountButton);
        navButtons.appendChild(signOutButton);
    }
};

function createButton(text) {
    var btn = document.createElement('button');
    btn.innerText = text;
    return btn;
}

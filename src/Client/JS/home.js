window.onload = async () => {
    // Reload page once to resolve any network issues
    var reloaded = sessionStorage.getItem('reloaded');
    if (reloaded == 'false' || !reloaded) {
        sessionStorage.setItem('reloaded', 'true');
        location.reload();
    }

    // Load buttons
    var navButtons = document.getElementById('navButtons');

    var userStatusRaw = await fetch('/server/api/user/account/status');
    var userStatus = await userStatusRaw.json();

    console.log(userStatus);
};

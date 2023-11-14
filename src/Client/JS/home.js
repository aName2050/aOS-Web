window.onload = async () => {
    var navButtons = document.getElementById('navButtons');

    var userStatusRaw = await fetch('/server/api/user/account/status');
    var userStatus = await userStatusRaw.json();

    console.log(userStatus);
};

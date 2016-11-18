// Name and Password from the register-form
var name = document.getElementById('name');
var pw = document.getElementById('pw');

// storing input from register-form
function loginAccount() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('pw', pw.value);
    console.log(name.value);
    console.log(pw.value);
}

// check if stored data from register-form is equal to entered data in the   login-form
function check() {

    // stored data from the register-form
    var storedName = localStorage.getItem('name');
    var storedPw = localStorage.getItem('pw');

    // entered data from the login-form
    var userName = document.getElementById('userName');
    var userPw = document.getElementById('userPw');

    // check if stored data from register-form is equal to data from login form
    if(userName.value !== storedName || userPw.value !== storedPw) {
        alert('ERROR');
    }else {
        alert('You are loged in.');
    }
}

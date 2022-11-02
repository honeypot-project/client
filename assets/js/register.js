"use strict";

document.addEventListener("DOMContentLoaded", init);



function init() {
    document.querySelector("#submit").addEventListener("click", register)
}

function register(e) {
    e.preventDefault();

    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    let data = {
        username: username,
        password: password
    }

    fetchFromServer("/register", "POST", data).then(response => {
        console.log(response);
    });
}

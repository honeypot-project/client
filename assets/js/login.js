"use strict";

document.addEventListener("DOMContentLoaded", init);


function init() {
    document.querySelector("#submit").addEventListener("click", login)
}

function login(e) {
    e.preventDefault();

    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    let data = {
        username: username,
        password: password
    }

    fetchFromServer("/login", "POST", data).then(response => {
        if  (response.status === 400) {
            document.querySelector("#message").innerHTML = "Wrong username or password";
        }
        if (response.ok) {
            document.querySelector("#message").innerHTML = "Login successful";
            setTimeout(function () {
                window.location.href = "dashboard.html"
            }, 3000);
        }
        console.log(response);

    });
}

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
        const messageBox = document.querySelector("#message p");
        if  (response.status === 400) {
            clearColors(messageBox);
            messageBox.classList.add("error");
            messageBox.innerHTML = "Wrong username or password";
        }
        if (response.ok) {
            clearColors(messageBox);
            messageBox.classList.add("success");
            messageBox.innerHTML = "Login successful";
            setTimeout(function () {
                window.location.href = "dashboard.html"
            }, 3000);
        }
    });
}

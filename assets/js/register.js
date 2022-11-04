"use strict";

document.addEventListener("DOMContentLoaded", init);


function init() {
    loadText();
    document.querySelector("#submit").addEventListener("click", register)
}

function loadText() {
    loadTitle();
}

function loadTitle() {
    const h1 = document.querySelector("h1");
    const text = `Sign Up`;

    let i = 0;

    const intervalId = setInterval(function () {
        h1.innerHTML += text[i];
        i++;

        if (i === text.length) {
            clearInterval(intervalId);
            loadFirstParagraph();
        }
    }, 50);


}

function loadFirstParagraph() {
    const p = document.querySelector("p");
    const text = `Please fill in this form to create an account. 👉👈`;

    let i = 0;

    const intervalId = setInterval(function () {
        p.innerHTML += text[i];
        i++;

        if (i === text.length) {
            clearInterval(intervalId);
            loadUsernameField();
        }
    }, 10);
}

function loadUsernameField() {
    const label = document.querySelector(`label[for="username"]`);
    const text = `Username:`;

    let i = 0;

    const intervalId = setInterval(function () {
        label.innerHTML += text[i];
        i++;

        if (i === text.length) {
            clearInterval(intervalId);
            loadUsernameInput();
            loadPasswordField();
        }
    }, 50);
}

function loadPasswordField() {
    const label = document.querySelector(`label[for="password"]`);
    const text = `Password:`;

    let i = 0;

    const intervalId = setInterval(function () {
        label.innerHTML += text[i];
        i++;

        if (i === text.length) {
            clearInterval(intervalId);
            loadPasswordInput()
        }
    }, 50);
}

function loadUsernameInput() {
    const input = document.querySelector("#username");
    input.classList.remove("hidden");
    input.focus();
}

function loadPasswordInput() {
    const input = document.querySelector("#password");
    input.classList.remove("hidden");
    input.focus();
    loadTermsAndConditions();
}

function loadTermsAndConditions() {
    const p = document.querySelector(".info");
    const text = `By creating an account you agree to our Terms & Privacy.`;

    let i = 0;

    const intervalId = setInterval(function () {
        p.innerHTML += text[i];
        i++;

        if (i === text.length) {
            clearInterval(intervalId);
        }
    }, 10);
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
        if (response.ok) {
            document.querySelector("#success").removeAttribute("hidden");
            setTimeout(function () {
                window.location.href = "login.html"
            }, 3000);
        }
    });
}

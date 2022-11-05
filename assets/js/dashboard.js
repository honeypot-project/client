"use strict";

document.addEventListener("DOMContentLoaded", init);


function init() {
    fetchFromServer("/challenges", "GET").then(response => {
        // Response is object with key id and value challenge
        checkResponse(response);
        if (response.ok) {
            response.json().then(challenges => {
                for (let id in challenges) {
                    parseChallenge(id, challenges[id]);
                }
            });
        }
    });
}

function parseChallenge(id, status) {
    console.log(id, status);
    let challenge = document.getElementById(id);
    challenge.querySelector(".status").innerHTML = status;
    if (status === "solved") {
        challenge.querySelector("button").remove();
        challenge.querySelector(".status").classList.add("success");
    } else {
        challenge.querySelector(".status").classList.add("warning");
    }
    makeButtonClickable();
}

function makeButtonClickable() {
    let buttons = document.querySelectorAll(".challenges .submit-challenge");
    buttons.forEach(button => {
        button.addEventListener("click", solveChallenge);
    });
}

function solveChallenge(e) {
    e.preventDefault();
    if (document.querySelector("form") !== null) {
        document.querySelector("form").remove();
    }
    let challenge = e.target.closest("li");

    challenge.insertAdjacentHTML("beforeend", submitFlagForm());
    challenge.querySelector("form button").addEventListener("click", submitFlag);
}

function submitFlag(e) {
    e.preventDefault();
    let challengeBeingSubmitted = e.target.closest("li");

    // Clear colors and show "submitting" message
    const status = challengeBeingSubmitted.querySelector(".status");
    clearColors(status);
    status.classList.add("warning");
    status.innerHTML = "Submitting...";

    let flag = challengeBeingSubmitted.querySelector("#flag").value;

    fetchFromServer("/challenges", "POST", {id: challengeBeingSubmitted.id, flag: flag}).then(response => {
        checkResponse(response);
        if (response.ok) {
            const status = challengeBeingSubmitted.querySelector(".status");
            status.innerHTML = "Solved";
            clearColors(status);
            status.classList.add("success");
            document.querySelector("form").remove();
            challengeBeingSubmitted.querySelector("button").remove();
        } else {
            response.json().then(error => {
                if (error.cause === "wrong flag") {
                    const status = challengeBeingSubmitted.querySelector(".status");
                    clearColors(status);
                    status.classList.add("error");
                    status.innerHTML = "WRONG FLAG";
                }

                if (error.cause === "user disabled") {
                    const status = challengeBeingSubmitted.querySelector(".status");
                    clearColors(status);
                    status.classList.add("error");
                    status.innerHTML = "USER DISABLED";
                }
            });
        }
    });
}

function submitFlagForm() {
    return `<form action="#">
                <input id="flag" type="text" placeholder="Flag">
                <button type="submit">Submit</button>
            </form>`;
}

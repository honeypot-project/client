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
    }
    makeButtonClickable();
}

function makeButtonClickable() {
    let buttons = document.querySelectorAll(".challenges button");
    buttons.forEach(button => {
        button.addEventListener("click", solveChallenge);
    });
}

function solveChallenge(e) {
    e.preventDefault();
    if (document.querySelector("form") !== null) {
        document.querySelector("form").remove();
    }
    let challengeId = e.target.closest("li").id;

    document.getElementById(challengeId).insertAdjacentHTML("beforeend", submitFlagForm());
    document.getElementById(challengeId).querySelector("#submit").addEventListener("click", submitFlag);
}

function submitFlag(e) {
    e.preventDefault();
    let challengeId = e.target.closest("li").id;

    let flag = document.getElementById(challengeId).querySelector("#flag").value;

    fetchFromServer("/challenges", "POST", {id: challengeId, flag: flag}).then(response => {
        checkResponse(response);

        if (response.error === "wrong flag") {
            document.getElementById(challengeId).querySelector(".status").innerHTML = "WRONG FLAG";
        }

        if (response.error === "user disabled") {
            document.getElementById(challengeId).querySelector(".status").innerHTML = "USER DISABLED";
        }

        if (response.ok) {
            document.getElementById(challengeId).querySelector(".status").innerHTML = "solved";
            document.querySelector("form").remove();
            document.getElementById(challengeId).querySelector("button").remove();
        }
    });
}

function submitFlagForm() {
    return `<form>
                <input id="flag" type="text" placeholder="Flag">
                <input id="submit" value="Submit" type="submit">
            </form>`;
}

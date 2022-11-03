"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    fetchFromServer("/users", "GET").then(response => {
        // Response is object with key id and value challenge
        checkResponse(response);
        if (response.ok) {
            response.json().then(users => {
                for (let id in users) {
                    parseUser(id, users[id]);
                }
            });
        }
    });
}


function parseChallenges(solvedChallenges) {
    let challenges = "";
    for (let id in solvedChallenges) {
        challenges += id + ", ";
    }
    challenges.substring(0, challenges.lastIndexOf(", "));
    return challenges;
}

function parseUser(id, user) {
    console.log(id, user);
    const solvedChallenges = parseChallenges(user.solvedChallenges);
    const generatedHtml = userHtml(id, user.username, solvedChallenges, user.disabled, user.admin);

    document.querySelector("#users").insertAdjacentHTML("beforeend", generatedHtml);
    if (user.administrator) {
        document.getElementById(id).querySelector(".make-admin").remove();
    }
    makeButtonClickable();
}


function userHtml(id, username, solvedChallenges, status, admin) {
    return `<li id="${id}">
            <p class="id">${id}</p>
            <p class="username">${username}</p>
            <p class="solved-challenges">${solvedChallenges}</p>
            <p class="status">${status}</p>
            <p class="admin">${admin}</p>
            <button class="make-admin">Make admin</button>
            <button class="toggle-status"></button>
        </li>`;
}

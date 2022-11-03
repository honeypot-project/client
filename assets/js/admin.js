"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    // Check which option is selected
    // If "All" is selected, show all users
    // If "Logged in" is selected, show only logged-in users
    callCorrectFetch(document.querySelector("#type").value);
    document.querySelector("#type").addEventListener("change", e => {
        callCorrectFetch(e.target.value);
    });
}

function callCorrectFetch(optionValue) {
    console.log(optionValue)
    if (optionValue === "all-users") {
        fetchAllUsers();
    } else if (optionValue === "online-users") {
        fetchOnlineUsers();
    }
}



function fetchOnlineUsers() {
    document.querySelector("#users").innerHTML = "";
    fetchFromServer("/online", "GET").then(response => {
        checkResponse(response);
        if (response.ok) {
            response.json().then(users => {
                console.log(users);
                for (let id in users) {
                    parseUser(id, users[id]);
                }
            });
        }
    });
}


function fetchAllUsers() {
    document.querySelector("#users").innerHTML = "";
    fetchFromServer("/users", "GET").then(response => {
        // Response is object with key id and value challenge
        checkResponse(response);
        if (response.ok) {
            response.json().then(users => {
                console.log(users);
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
    if (user.admin) {
        document.getElementById(id).querySelector(".make-admin").remove();
    }
    if (user.disabled) {
        document.getElementById(id).querySelector(".toggle-status").innerHTML = "Enable";
    } else {
        document.getElementById(id).querySelector(".toggle-status").innerHTML = "Disable";
    }

    makeToggleButtonsClickable();

}

// Yet to be implemented in API
function giveAdmin(e) {
    let userId = e.target.closest("li").id;
    fetchFromServer(`/admin?user=${userId}`, "GET").then(response => {
        checkResponse(response);
        if (response.ok) {
            document.getElementById(userId).querySelector(".make-admin").remove();
        }
    })
}

function toggleStatus(e) {
    let userId = e.target.closest("li").id;
    fetchFromServer(`/toggleUser?user=${userId}`, "GET").then(response => {
        checkResponse(response);
        if (response.ok) {
            if (e.target.innerHTML === "Disable") {
                e.target.innerHTML = "Enable";
            } else {
                e.target.innerHTML = "Disable";
            }
        }
    });
}

function makeToggleButtonsClickable() {
    let adminMaker = document.querySelectorAll(".make-admin");
    adminMaker.forEach(button => {
        button.addEventListener("click", giveAdmin);
    });

    let statusToggler = document.querySelectorAll(".toggle-status");
    statusToggler.forEach(button => {
        button.addEventListener("click", toggleStatus);
    });
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

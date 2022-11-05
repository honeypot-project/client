"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    callCorrectFetch(document.querySelector("#type").value)
    setInterval(() => {
        callCorrectFetch(document.querySelector("#type").value)
    }, 5000);
    // Check which option is selected
    // If "All" is selected, show all users
    // If "Logged in" is selected, show only logged-in users
    document.querySelector("#type").addEventListener("change", e => {
        callCorrectFetch(e.target.value);
    });
}

function callCorrectFetch(optionValue) {
    if (optionValue === "all-users") {
        fetchAllUsers();
    } else if (optionValue === "online-users") {
        fetchOnlineUsers();
    }
}

function fetchOnlineUsers() {
    fetchFromServer("/online", "GET").then(response => {
        document.querySelector("#users").innerHTML = "";
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

function fetchAllUsers() {
    fetchFromServer("/users", "GET").then(response => {
        document.querySelector("#users").innerHTML = "";
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
    return `
            <li id="${id}">
                <p class="id">user id: ${id}</p>
                <p class="username">username: ${username}</p>
                <p class="solved-challenges">${solvedChallenges}</p>
                <p class="status">disabled: ${status}</p>
                <p class="admin">admin: ${admin}</p>
                <button class="make-admin">Make admin</button>
                <button class="toggle-status"></button>
            </li>`;
}

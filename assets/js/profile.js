"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    // Load profile data from server
    fetchFromServer("/user", "GET").then(response => {
        checkResponse(response);
        response.json().then(result => {
            fillDetails(result);
        });
    })
}


function fillDetails(details) {
    fetchFromServer(`/uploads/imgs/${details.img_id}`, "GET").then(response => {
        checkResponse(response);
        if (response.ok) {
            document.querySelector("#profile-img").src = response.url;
            document.querySelector("#username").innerHTML = "Username: " + details.username;
            document.querySelector("#disabled").innerHTML = "Disabled: " + details.disabled;
            document.querySelector("#admin").innerHTML = "Admin: " + details.admin;
        }
    });
}
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

    // Add event listener to upload button
    document.querySelector("#upload-image").addEventListener("click", uploadImage);
}


function uploadImage(e) {
    e.preventDefault();

    // Upload image to server with post request
    const request = new XMLHttpRequest();
    request.open("POST", _config.getAPIUrl() + "/upload", true);
    let data = new FormData();
    data.append("image", document.querySelector("#image-upload").files[0]);
    request.send(data);
}

function fillDetails(details) {
    fetchFromServer(`/uploads/images/${details.img_id}`, "GET").then(response => {
        checkResponse(response);
        if (response.ok) {
            document.querySelector("#profile-img").src = response.url;
            document.querySelector("#username").innerHTML = "Username: " + details.username;
            document.querySelector("#disabled").innerHTML = "Disabled: " + details.disabled;
            document.querySelector("#admin").innerHTML = "Admin: " + details.admin;
        }
    });
}
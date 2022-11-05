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
    document.querySelector("#image-upload").addEventListener("change", function () {
        document.querySelector("#upload-image").classList.remove("hidden");
    });

    // Add event listener to upload button
    document.querySelector("#upload-image").addEventListener("click", uploadImage);

    // Remove session when logging out
    document.querySelector("#logout-button").addEventListener("click", removeSession);
}


function uploadImage(e) {
    e.preventDefault();

    // Upload image to server with post request
    const request = new XMLHttpRequest();
    request.open("POST", _config.getAPIUrl() + "/upload", true);
    let data = new FormData();
    data.append("image", document.querySelector("#image-upload").files[0]);
    request.send(data);

    request.onloadend = function () {
        if (request.status === 200) {
            // Reload page to show new image
            window.location.reload();
        } else {

            const messageBox = document.querySelector("#message");
            messageBox.querySelector("p").innerHTML = JSON.parse(request.response).cause;
        }
    }
}

function fillDetails(details) {
    fetchFromServer(`/uploads/images/${details.img_id}`, "GET").then(response => {
        checkResponse(response);
        if (response.ok) {
            document.querySelector("#profile-img").src = response.url;
        } else {
            document.querySelector("#profile-img").src = _config.defaultProfileImage();
        }

        document.querySelector("#username").innerHTML = "Username: " + details.username;
        document.querySelector("#disabled").innerHTML = "Disabled: " + details.disabled;
        document.querySelector("#admin").innerHTML = "Admin: " + details.admin;
    });
}

function removeSession(e) {
    const cookie = document.cookie;
    document.cookie=cookie+";max-age=0";
}
"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    // Load profile data from server
    fetchFromServer("/user", "GET").then(response => {
        checkResponse(response);
        response.json().then(result => {
            updateImage(result.img_id);
        });
    })
}


function updateImage(img_id) {
    fetchFromServer(`/uploads/imgs/${img_id}`, "GET").then(response => {
        checkResponse(response);
        if (response.ok) {
            document.querySelector("#profile-img").src = response.url;
        }
    });
}
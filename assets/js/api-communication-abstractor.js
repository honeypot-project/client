"use strict";

function fetchFromServer(path, httpVerb, requestBody) {
    const options = constructOptions(httpVerb, requestBody);

    return fetch(`${_config.getAPIUrl()}${path}`, options)
        .then((response) => {
            if (!response.ok) {
                console.error(response);
                return response;
            }
            return response;
        })
        .then((responseToParse) => {
            return responseToParse;
        });
}

function constructOptions(httpVerb, requestBody) {
    const options = {
        method: httpVerb,
        headers: {"Content-Type": "application/json"},
    };

    // Don't forget to add data to the body when needed
    options.body = JSON.stringify(requestBody);
    return options;
}

function checkResponse(response) {
    if (response.status === 403 || response.status === 401 || response.status === 400) {
        window.location.href = "login.html";

    }
}

function clearColors(tag) {
    tag.classList.remove("success");
    tag.classList.remove("warning");
    tag.classList.remove("error");
}


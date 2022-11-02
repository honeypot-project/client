"use strict";

function fetchFromServer(path, httpVerb, requestBody) {
    const options = constructOptions(httpVerb, requestBody);

    return fetch(`${_config.getAPIUrl()}${path}`, options)
        .then((response) => {
            if (!response.ok) {
                console.error(response);
            }
            return response.json();
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


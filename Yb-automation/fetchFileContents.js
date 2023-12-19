// Function to get query parameters
function getQueryParams(url) {
    let queryParams = {};
    let anchor = document.createElement('a');
    anchor.href = url;
    let queryStrings = anchor.search.substring(1);
    let params = queryStrings.split('&');

    for (var i = 0; i < params.length; i++) {
        var pair = params[i].split('=');
        queryParams[pair[0]] = decodeURIComponent(pair[1]);
    }

    return queryParams;
}

// Extract testName from the URL
function getTestName() {
    let params = getQueryParams(window.location.href);
    return params.testName || "tests/publishing/ui_tests/test_text_assets.py";
}

// Send a POST request to the specified URL
function fetchFileContents() {
    let testName = getTestName();
    console.log(testName);

    axios.post('https://zyw4xz6b5m2c7mdbhhsoerydve0mgnfl.lambda-url.us-west-2.on.aws/', {
        filePath: testName,
        requestType: 'FETCH_FILE_CONTENTS',
        branchName: 'main'
    })
    .then(function (response) {
        // Log the response to the console
        console.log(response);

        // Set the response data as the text content of the code element
        document.getElementById('codeBox').textContent = response.data;

        // Highlight the code
        Prism.highlightAll();
    })
    .catch(function (error) {
        console.log(error);
    });
}

export { fetchFileContents };

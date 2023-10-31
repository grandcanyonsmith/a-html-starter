document.addEventListener("DOMContentLoaded", function () {
    const requirementsInput = document.getElementById("requirements-file-input");
    const miscellaneousInput = document.getElementById("miscellaneous-file-input");

    const securityTestCaseButton = document.querySelector('.test-case-group .create-test-case-button');
    const securityTestButton = document.querySelector('.test-case-group .create-tests-button');
    const securityTestCasesTextarea = document.getElementById('security-test-cases');

    const performanceTestCaseButton = document.querySelectorAll('.test-case-group .create-test-case-button')[1];
    const performanceTestButton = document.querySelectorAll('.test-case-group .create-tests-button')[1];
    const performanceTestCasesTextarea = document.getElementById('performance-test-cases');

    const functionalTestCaseButton = document.querySelectorAll('.test-case-group .create-test-case-button')[2];
    const functionalTestButton = document.querySelectorAll('.test-case-group .create-tests-button')[2];
    const functionalTestCasesTextarea = document.getElementById('functional-test-cases');

    const regressionTestCaseButton = document.querySelectorAll('.test-case-group .create-test-case-button')[3];
    const regressionTestButton = document.querySelectorAll('.test-case-group .create-tests-button')[3];
    const regressionTestCasesTextarea = document.getElementById('regression-test-cases');

    const designTestCaseButton = document.querySelectorAll('.test-case-group .create-test-case-button')[4];
    const designTestButton = document.querySelectorAll('.test-case-group .create-tests-button')[4];
    const designTestCasesTextarea = document.getElementById('design-test-cases');

    requirementsInput.addEventListener("change", handleFileInput);
    // miscellaneousInput.addEventListener("change", handleFileInput);

    securityTestCaseButton.addEventListener('click', function () {
        createSecurityTestCases(securityTestCasesTextarea.value);
    });

    securityTestButton.addEventListener('click', function () {
        createSecurityTests(securityTestCasesTextarea.value);
    });

    performanceTestCaseButton.addEventListener('click', function () {
        createPerformanceTestCases(performanceTestCasesTextarea.value);
    });

    regressionTestCaseButton.addEventListener('click', function () {
        createRegressionTestCases(regressionTestCasesTextarea.value);
    });

    functionalTestCaseButton.addEventListener('click', function () {
        createFunctionalTestCases(functionalTestCasesTextarea.value);
    });

    designTestCaseButton.addEventListener('click', function () {
        createDesignTestCases(designTestCasesTextarea.value);
    });

    function handleFileInput(event) {
        const files = Array.from(event.target.files);
        files.forEach(file => {
            if (file.type === "text/plain") {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const content = e.target.result;
                    console.log("Content of " + file.name + ": ", content);
                };
                reader.readAsText(file);
            }
        });
    }
});


function createSecurityTestCases(requirements) {
    console.clear();
    const formattedMessage = `Create security test cases based on these requirements: ${requirements}`;

    console.log(formattedMessage);

    const LAMBDA_ENDPOINT_URL = 'https://cvj4jobfrygsdcxxu6tkhtk4uu0kcrqw.lambda-url.us-east-1.on.aws/';

    fetch(LAMBDA_ENDPOINT_URL, {
        method: 'POST',
        body: JSON.stringify({ message: formattedMessage })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            document.getElementById('security-test-cases').value = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function createSecurityTests(testCases) {
    console.clear();

    const testCasesData = securityTestCasesTextarea.value;
    localStorage.setItem('securityTestCasesData', testCasesData);

    window.location.href = "/runcode.html";
}

function createPerformanceTestCases(requirements) {
    console.clear();
    const formattedMessage = `Create performance test cases based on these requirements: ${requirements}`;

    console.log(formattedMessage);

    const LAMBDA_ENDPOINT_URL = 'https://cvj4jobfrygsdcxxu6tkhtk4uu0kcrqw.lambda-url.us-east-1.on.aws/';

    fetch(LAMBDA_ENDPOINT_URL, {
        method: 'POST',
        body: JSON.stringify({ message: formattedMessage })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            document.getElementById('performance-test-cases').value = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function createPerformanceTests(testCases) {
    console.clear();
    const formattedMessage = `Create performance tests with python based on these test cases: ${testCases}`;

    console.log(formattedMessage);

    const LAMBDA_ENDPOINT_URL = 'https://your-lambda-function-url.com';

    fetch(LAMBDA_ENDPOINT_URL, {
        method: 'POST',
        body: JSON.stringify({ message: formattedMessage })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function createFunctionalTestCases(requirements) {
    console.clear();
    const formattedMessage = `Create functional test cases based on these requirements: ${requirements}`;

    console.log(formattedMessage);

    const LAMBDA_ENDPOINT_URL = 'https://cvj4jobfrygsdcxxu6tkhtk4uu0kcrqw.lambda-url.us-east-1.on.aws/';

    fetch(LAMBDA_ENDPOINT_URL, {
        method: 'POST',
        body: JSON.stringify({ message: formattedMessage })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            document.getElementById('functional-test-cases').value = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function createFunctionalTests(testCases) {
    console.clear();
    const formattedMessage = `Create functional tests with python based on these test cases: ${testCases}`;

    console.log(formattedMessage);

    const LAMBDA_ENDPOINT_URL = 'https://your-lambda-function-url.com';

    fetch(LAMBDA_ENDPOINT_URL, {
        method: 'POST',
        body: JSON.stringify({ message: formattedMessage })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function createRegressionTestCases(requirements) {
    console.clear();
    const formattedMessage = `Create regression test cases based on these requirements: ${requirements}`;

    console.log(formattedMessage);

    const LAMBDA_ENDPOINT_URL = 'https://cvj4jobfrygsdcxxu6tkhtk4uu0kcrqw.lambda-url.us-east-1.on.aws/';

    fetch(LAMBDA_ENDPOINT_URL, {
        method: 'POST',
        body: JSON.stringify({ message: formattedMessage })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            document.getElementById('regression-test-cases').value = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function createRegressionTests(testCases) {
    console.clear();
    const formattedMessage = `Create regression tests with python based on these test cases: ${testCases}`;

    console.log(formattedMessage);

    const LAMBDA_ENDPOINT_URL = 'https://your-lambda-function-url.com';

    fetch(LAMBDA_ENDPOINT_URL, {
        method: 'POST',
        body: JSON.stringify({ message: formattedMessage })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function createDesignTestCases(requirements) {
    console.clear();
    const formattedMessage = `Create design test cases based on these requirements: ${requirements}`;

    console.log(formattedMessage);

    const LAMBDA_ENDPOINT_URL = 'https://cvj4jobfrygsdcxxu6tkhtk4uu0kcrqw.lambda-url.us-east-1.on.aws/';

    fetch(LAMBDA_ENDPOINT_URL, {
        method: 'POST',
        body: JSON.stringify({ message: formattedMessage })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            document.getElementById('design-test-cases').value = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function createDesignTests(testCases) {
    console.clear();
    const formattedMessage = `Create design tests with python based on these test cases: ${testCases}`;

    console.log(formattedMessage);

    const LAMBDA_ENDPOINT_URL = 'https://your-lambda-function-url.com';

    fetch(LAMBDA_ENDPOINT_URL, {
        method: 'POST',
        body: JSON.stringify({ message: formattedMessage })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

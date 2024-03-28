function sendPostRequest() {
    var instagram = document.getElementById('instagram').value;
    var button = document.getElementById('submit-button');
    button.innerText = 'Loading...';
    axios.post('https://cnwsznpreoankgayinwzcvdcnu0aotwe.lambda-url.us-west-2.on.aws/', {
        instagram: instagram
    })
    .then(function (response) {
        // Mapping only the message key from the response
        document.getElementById('response').children[0].innerText = response.data.message;
        button.innerText = 'Submit';
        document.getElementById('copy-button').classList.remove('hidden');
    })
    .catch(function (error) {
        console.log(error);
        button.innerText = 'Submit';
    });
}

function copyToClipboard() {
    var text = document.getElementById('response').children[0].innerText;
    navigator.clipboard.writeText(text).then(function() {
        console.log('Copying to clipboard was successful!');
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
}

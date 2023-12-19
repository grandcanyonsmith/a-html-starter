document.addEventListener("DOMContentLoaded", function() {
    function autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

function executeCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const filePath = urlParams.get('testName');
    const executeButton = document.getElementById('executePythonCodeButton');
    const playIcon = executeButton.innerHTML;
    const spinnerIcon = '<div class="loader"></div>'; // Add your spinner icon HTML here
    executeButton.innerHTML = spinnerIcon;

    axios.post('https://xmichysgq4emm6orafcdnwwhwu0lvmez.lambda-url.us-west-2.on.aws/', {
        filePath: filePath
    })
    .then(function (response) {
        const output = response.data.StandardOutputContent || '';
        const error = response.data.StandardErrorContent || '';
        document.getElementById('standardOutput').textContent = output;
        document.getElementById('standardError').textContent = error;
        Prism.highlightAll();
        executeButton.innerHTML = playIcon;
        document.getElementById('viewLogsButton').click();
    })
    .catch(function (error) {
        console.error('Error executing code:', error);
        executeButton.innerHTML = playIcon;
    });
}

    document.getElementById('executePythonCodeButton').addEventListener('click', executeCode);

function toggleTab(selectedTab) {
    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => {
        if (tab === selectedTab) {
            tab.classList.add('text-white', 'bg-gray-600');
            tab.classList.remove('text-gray-400', 'hover:text-white', 'hover:bg-gray-400');
        } else {
            tab.classList.remove('text-white', 'bg-gray-600');
            tab.classList.add('text-gray-400', 'hover:text-white', 'hover:bg-gray-400');
        }
    });
}

    document.getElementById('viewCodeButton').addEventListener('click', function() {
        toggleTab(this);
        document.getElementById('viewCodeBox').classList.remove('hidden');
        document.getElementById('viewLogsContainer').classList.add('hidden');
    });

    document.getElementById('viewLogsButton').addEventListener('click', function() {
        toggleTab(this);
        document.getElementById('viewLogsContainer').classList.remove('hidden');
        document.getElementById('viewCodeBox').classList.add('hidden');
    });

    window.onload = function() {
        document.getElementById('viewCodeButton').click();
    }
});

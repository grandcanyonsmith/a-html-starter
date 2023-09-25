(function() {
    var css = document.createElement('link');
    css.href = "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css";
    css.rel = "stylesheet";
    document.head.appendChild(css);

    var script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js";
    document.head.appendChild(script);

    var button = document.createElement('button');
    button.id = "myBtn";
    button.className = "fixed right-0 top-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
    button.textContent = "Open Modal";
    document.body.appendChild(button);

    var modal = document.createElement('div');
    modal.id = "myModal";
    modal.className = "fixed z-10 inset-0 overflow-y-auto hidden";
    modal.setAttribute("aria-labelledby", "modal-title");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    document.body.appendChild(modal);

    var flexDiv = document.createElement('div');
    flexDiv.className = "flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0";
    modal.appendChild(flexDiv);

    var bgDiv = document.createElement('div');
    bgDiv.className = "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity";
    bgDiv.setAttribute("aria-hidden", "true");
    flexDiv.appendChild(bgDiv);

    var span = document.createElement('span');
    span.className = "hidden sm:inline-block sm:align-middle sm:h-screen";
    span.setAttribute("aria-hidden", "true");
    span.innerHTML = "&#8203;";
    flexDiv.appendChild(span);

    var inlineDiv = document.createElement('div');
    inlineDiv.className = "inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full";
    flexDiv.appendChild(inlineDiv);

    var bgWhiteDiv = document.createElement('div');
    bgWhiteDiv.className = "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4";
    inlineDiv.appendChild(bgWhiteDiv);

    var h5 = document.createElement('h5');
    h5.className = "text-lg leading-6 font-medium text-gray-900";
    h5.id = "modal-title";
    h5.textContent = "Enter your request";
    bgWhiteDiv.appendChild(h5);

    var input = document.createElement('input');
    input.type = "text";
    input.id = "userRequest";
    input.className = "mt-3 w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
    bgWhiteDiv.appendChild(input);

    var bgGrayDiv = document.createElement('div');
    bgGrayDiv.className = "bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse";
    inlineDiv.appendChild(bgGrayDiv);

    var submitBtn = document.createElement('button');
    submitBtn.type = "button";
    submitBtn.id = "submitBtn";
    submitBtn.className = "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm";
    submitBtn.textContent = "Submit";
    bgGrayDiv.appendChild(submitBtn);

    var closeBtn = document.createElement('button');
    closeBtn.type = "button";
    closeBtn.id = "closeBtn";
    closeBtn.className = "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm";
    closeBtn.textContent = "Close";
    bgGrayDiv.appendChild(closeBtn);

    button.addEventListener('click', function() {
        document.getElementById('myModal').classList.remove('hidden');
    });

    closeBtn.addEventListener('click', function() {
        document.getElementById('myModal').classList.add('hidden');
    });

    submitBtn.addEventListener('click', function() {
        this.textContent = 'Loading...';
        var userRequest = document.getElementById('userRequest').value;
        var currentUrl = window.location.href;
        console.log(currentUrl,'currentUrl')
        var data = {
            "userRequest": userRequest,
            "repo_name":"a-html-starter",
            "branch_name": "main",
            "currentUserUrl": currentUrl
        };
        axios.post("https://clpa2mrkgtskqlc4y64jego5xq0xfqpe.lambda-url.us-west-2.on.aws/", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            alert('Request submitted successfully');
        })
        .catch(function (error) {
            alert('Error in submission');
        })
        .finally(function () {
            document.getElementById('submitBtn').textContent = 'Submit';
            document.getElementById('myModal').classList.add('hidden');
        });
    });
})();

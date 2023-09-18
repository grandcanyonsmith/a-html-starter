// window.onload = function() {
//     let updatedCode = null;
//     let activeTab = null; // New variable to keep track of the active tab
//     const elements = {
//         sourceBtn: document.getElementById("sourceBtn"),
//         outputBtn: document.getElementById("outputBtn"),
//         submitBtn: document.getElementById("submitBtn"),
//         saveBtn: document.getElementById("saveBtn"),
//         runBtn: document.getElementById("runBtn"),
//         repoDropdown: document.getElementById("repoDropdown"),
//         fileDropdown: document.getElementById("fileDropdown"),
//         codeBox: document.getElementById("codeBox"),
//         outputBox: document.getElementById("outputBox"),
//         loader: document.getElementById("loader"),
//         requestInput: document.getElementById("requestInput"),
//     };
// const addEventListeners = () => {
//     elements.sourceBtn.addEventListener("click", () => toggleView("sourceBtn"));
//     elements.outputBtn.addEventListener("click", () => toggleView("outputBtn"));
//     elements.submitBtn.addEventListener("click", submitCodeRequest);
//     elements.saveBtn.addEventListener("click", saveCodeFile);
//     elements.runBtn.addEventListener("click", executeCode);
//     elements.repoDropdown.addEventListener("change", updateFileDropdown);
//     elements.fileDropdown.addEventListener("change", updateCodeBox);
//     feather.replace();
// };

// const toggleView = (targetId) => {
//     const isSourceEvent = targetId === "sourceBtn";
//     elements.codeBox.classList.toggle("hidden", !isSourceEvent);
//     elements.outputBox.classList.toggle("hidden", isSourceEvent);
//     if (!isSourceEvent) {
//         displayOutput(elements.fileDropdown.value, elements.codeBox.textContent, elements.outputBox);
//     }
//     Prism.highlightAll();
// };

// const displayOutput = (selectedFileUrl, codeBoxContent, outputBoxElement) => {
//     if (selectedFileUrl.endsWith(".html")) {
//         const iframe = document.createElement("iframe");
//         iframe.style.width = "100%";
//         iframe.style.height = "100%";
//         iframe.style.border = "0";
//         outputBoxElement.innerHTML = "";
//         outputBoxElement.appendChild(iframe);
//         iframe.contentWindow.document.open();
//         // Inject CSS and JS code into HTML code
//         const injectedCode = injectCode(codeBoxContent);
//         iframe.contentWindow.document.write(injectedCode);
//         iframe.contentWindow.document.close();
//     } else {
//         outputBoxElement.textContent = codeBoxContent;
//         outputBoxElement.style.overflow = "auto";
//     }
// };

// const injectCode = (htmlCode) => {
//     // Get all tabs
//     const tabs = Array.from(document.querySelectorAll('.tab'));
//     let cssCode = '';
//     let jsCode = '';
//     tabs.forEach(tab => {
//         const fileName = tab.querySelector('span').textContent;
//         if (fileName.endsWith('.css')) {
//             cssCode += tab.dataset.content;
//         } else if (fileName.endsWith('.js')) {
//             jsCode += tab.dataset.content;
//         }
//     });
//     // Inject CSS and JS code into HTML code
//     const injectedCode = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <style>${cssCode}</style>
//         </head>
//         <body>
//             ${htmlCode}
//             <script>${jsCode}</script>
//         </body>
//         </html>
//     `;
//     return injectedCode;
// };

// const executeCode = async () => {
//     elements.runBtn.textContent = "Running...";
//     try {
//         const { data } = await axios.post(urls.runCode, { code: elements.codeBox.textContent });
//         elements.outputBox.textContent = data;
//         toggleView("outputBtn");
//     } catch (error) {
//         console.error(error);
//     } finally {
//         elements.runBtn.textContent = "Run";
//         elements.loader.classList.add("hidden");
//     }
// };

// const submitCodeRequest = async () => {
//     elements.submitBtn.textContent = "Loading...";
//     try {
//         const { data } = await axios.post(urls.submitRequest, {
//             code: elements.codeBox.textContent,
//             request: elements.requestInput.value,
//             fileName: elements.fileDropdown.options[elements.fileDropdown.selectedIndex].text,
//             repoName: elements.repoDropdown.options[elements.repoDropdown.selectedIndex].text
//         });
//         handleResponse(data);
//     } catch (error) {
//         console.error(error);
//     } finally {
//         elements.submitBtn.textContent = "Submit";
//         elements.loader.classList.add("hidden");
//     }
// };

// const handleResponse = (response) => {
//     response.forEach(file => {
//         const existingTab = Array.from(document.querySelectorAll('.tab')).find(tab => tab.querySelector('span').textContent === file.fileName);
//         if (existingTab) {
//             // Update existing tab content
//             existingTab.dataset.content = file.fileContents;
//         } else {
//             // Create new tab
//             const tab = createTab(file);
//             document.getElementById('tabs').appendChild(tab);
//         }
//         // Store the updated code
//         updatedCode = file.fileContents;
//     });
//     // Activate the first tab
//     $('.tab').first().click();
//     // Always switch to the code view
//     toggleView("outputBtn");
//     // Refresh the code content
//     updateCodeContent(elements.fileDropdown.value);
//     // Make the save button visible
//     elements.saveBtn.classList.remove("hidden");
// };

// const createTab = (file) => {
//     const tab = document.createElement('div');
//     tab.className = `tab px-4 py-2 mr-2 bg-gray-200 hover:bg-gray-300 rounded-t-lg flex items-center justify-between ${file.newFile ? 'border-b-2 border-green-400' : ''}`;
//     tab.innerHTML = `
//         <span class="text-sm">${file.fileName}</span>
//         <i data-feather="x-circle" class="ml-2 hover:bg-gray-400 rounded-full p-1 cursor-pointer"></i>
//     `;
//     tab.dataset.content = file.fileContents;
//     tab.setAttribute('newFile', file.newFile ? 'true' : 'false'); // Set the newFile attribute
//     feather.replace();
//     tab.addEventListener('click', () => {
//         elements.codeBox.textContent = tab.dataset.content;
//         $('.tab').removeClass('bg-gray-300');
//         tab.classList.add('bg-gray-300');
//         activeTab = tab; // Update the activeTab when a tab is clicked
//     });
//     tab.querySelector('i').addEventListener('click', (e) => {
//         e.stopPropagation();
//         tab.remove();
//     });
//     return tab;
// };


// const saveCodeFile = async () => {
//     if (!activeTab) {
//         console.error("No active tab found.");
//         return;
//     }

//     const fileName = activeTab.querySelector('span').textContent;
//     const fileContents = activeTab.dataset.content;
//     console.log(activeTab,'activeTab')
//     const isNewFile = activeTab.getAttribute('newFile') === 'true'; // Check if the tab is a new file

//     const fileUrlParts = elements.fileDropdown.value.split("/");
//     const repoIndex = fileUrlParts.indexOf("grandcanyonsmith") + 1;
//     const repoName = fileUrlParts[repoIndex];
//     const branchName = fileUrlParts[repoIndex + 1];

//     try {
//         let data;
//         if (isNewFile) {
//             // If it's a new file, send a POST request to the specified URL
//             const response = await axios.post('https://flask-hello-world2-three.vercel.app/create_new_file', {
//                 repo_name: repoName,
//                 file_name: fileName,
//                 file_contents: fileContents,
//                 branch_name: branchName
//             });
//             data = response.data;
//         } else {
//             // If it's not a new file, send a POST request to the original URL
//             const response = await axios.post(urls.update, {
//                 repo_name: repoName,
//                 file_name: fileName,
//                 file_contents: fileContents,
//                 branch_name: branchName
//             });
//             data = response.data;
//         }
//         console.log("Response from server:", data);
//     } catch (error) {
//         console.error("Error occurred while saving file:", error);
//         if (error.response && error.response.status === 500) {
//             alert("Server error. Please try again later.");
//         }
//     } finally {
//         elements.saveBtn.classList.add("hidden");
//     }
// };

// const updateCodeBox = () => {
//     updateCodeContent(elements.fileDropdown.value);
//     elements.runBtn.classList.toggle("hidden", !elements.fileDropdown.value.endsWith(".py"));
//     const tabs = document.getElementById('tabs');
//     tabs.innerHTML = '';
// };

// const updateFileDropdown = () => {
//     populateFileDropdown(elements.repoDropdown.value);
//     const tabs = document.getElementById('tabs');
//     tabs.innerHTML = '';
// };

// const populateRepoDropdown = async () => {
//     const { data } = await axios.get(urls.getRepos);
//     data.forEach(repo => elements.repoDropdown.append(new Option(repo, repo)));
// };

// const populateFileDropdown = async (repo) => {
//     const { data } = await axios.get(`${urls.getFiles}${repo}/contents`);
//     elements.fileDropdown.innerHTML = "";
//     elements.fileDropdown.append(new Option("Select a file", ""));
//     data.forEach(file => elements.fileDropdown.append(new Option(file.name, file.download_url)));
// };

// const updateCodeContent = async (fileUrl) => {
//     if (updatedCode) {
//         elements.codeBox.textContent = updatedCode;
//     } else {
//         const { data } = await axios.get(fileUrl);
//         elements.codeBox.textContent = data;
//     }
//     Prism.highlightAll();
// };

// addEventListeners();
// populateRepoDropdown();
// };



window.onload = function() {
    let updatedCode = null;
    let activeTab = null; // New variable to keep track of the active tab
    const elements = {
        sourceBtn: document.getElementById("sourceBtn"),
        outputBtn: document.getElementById("outputBtn"),
        submitBtn: document.getElementById("submitBtn"),
        saveBtn: document.getElementById("saveBtn"),
        runBtn: document.getElementById("runBtn"),
        repoDropdown: document.getElementById("repoDropdown"),
        fileDropdown: document.getElementById("fileDropdown"),
        codeBox: document.getElementById("codeBox"),
        outputBox: document.getElementById("outputBox"),
        loader: document.getElementById("loader"),
        requestInput: document.getElementById("requestInput"),
    };
const addEventListeners = () => {
    elements.sourceBtn.addEventListener("click", () => toggleView("sourceBtn"));
    elements.outputBtn.addEventListener("click", () => toggleView("outputBtn"));
    elements.submitBtn.addEventListener("click", submitCodeRequest);
    elements.saveBtn.addEventListener("click", saveCodeFile);
    elements.runBtn.addEventListener("click", executeCode);
    elements.repoDropdown.addEventListener("change", updateFileDropdown);
    elements.fileDropdown.addEventListener("change", updateCodeBox);
    feather.replace();
};

const toggleView = (targetId) => {
    const isSourceEvent = targetId === "sourceBtn";
    elements.codeBox.classList.toggle("hidden", !isSourceEvent);
    elements.outputBox.classList.toggle("hidden", isSourceEvent);
    if (!isSourceEvent) {
        displayOutput(elements.fileDropdown.value, elements.codeBox.textContent, elements.outputBox);
    }
    Prism.highlightAll();
};

const displayOutput = (selectedFileUrl, codeBoxContent, outputBoxElement) => {
    if (selectedFileUrl.endsWith(".html")) {
        const iframe = document.createElement("iframe");
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "0";
        outputBoxElement.innerHTML = "";
        outputBoxElement.appendChild(iframe);
        iframe.contentWindow.document.open();
        // Inject CSS and JS code into HTML code
        const injectedCode = injectCode(codeBoxContent);
        iframe.contentWindow.document.write(injectedCode);
        iframe.contentWindow.document.close();
    } else {
        outputBoxElement.textContent = codeBoxContent;
        outputBoxElement.style.overflow = "auto";
    }
};

const injectCode = (htmlCode) => {
    // Get all tabs
    const tabs = Array.from(document.querySelectorAll('.tab'));
    let cssCode = '';
    let jsCode = '';
    let newImports = []; // Array to store new imports
    tabs.forEach(tab => {
        const fileName = tab.querySelector('span').textContent;
        if (fileName.endsWith('.css')) {
            cssCode += tab.dataset.content;
        } else if (fileName.endsWith('.js')) {
            jsCode += tab.dataset.content;
        } else if (fileName.endsWith('.json')) {
            newImports.push(fileName); // Add new import to the array
        }
    });
    // Parse htmlCode to find any .html file imports
    const htmlImports = htmlCode.match(/href="\s*([^"]+\.html)\s*"/g);
    if (htmlImports) {
        htmlImports.forEach(htmlImport => {
            const htmlFile = htmlImport.match(/"([^"]+)"/)[1];
            // Check if a tab for this .html file exists
            const htmlTab = tabs.find(tab => tab.querySelector('span').textContent === htmlFile);
            if (!htmlTab) {
                // If the tab doesn't exist, create it
                const newHtmlFile = { fileName: htmlFile, fileContents: '', newFile: true };
                const newHtmlTab = createTab(newHtmlFile);
                document.getElementById('tabs').appendChild(newHtmlTab);
            }
        });
    }
    // Inject CSS and JS code into HTML code
    const injectedCode = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${cssCode}</style>
            ${newImports.map(fileName => `<script src="${fileName}"></script>`).join('\n')} <!-- Inject new imports -->
        </head>
        <body>
            ${htmlCode}
            <script>${jsCode}</script>
        </body>
        </html>
    `;
    return injectedCode;
};
    // Inject CSS and JS code into HTML code
    const injectedCode = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${cssCode}</style>
            ${newImports.map(fileName => `<script src="${fileName}"></script>`).join('\n')} <!-- Inject new imports -->
        </head>
        <body>
            ${htmlCode}
            <script>${jsCode}</script>
        </body>
        </html>
    `;
    return injectedCode;
};


    // Inject CSS and JS code into HTML code
    const injectedCode = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${cssCode}</style>
        </head>
        <body>
            ${htmlCode}
            <script>${jsCode}</script>
        </body>
        </html>
    `;
    return injectedCode;
};

const executeCode = async () => {
    elements.runBtn.textContent = "Running...";
    try {
        const { data } = await axios.post(urls.runCode, { code: elements.codeBox.textContent });
        elements.outputBox.textContent = data;
        toggleView("outputBtn");
    } catch (error) {
        console.error(error);
    } finally {
        elements.runBtn.textContent = "Run";
        elements.loader.classList.add("hidden");
    }
};

const submitCodeRequest = async () => {
    elements.submitBtn.textContent = "Loading...";
    try {
        console.log('Submitting code request...'); // Debug line
        const { data } = await axios.post(urls.submitRequest, {
            code: elements.codeBox.textContent,
            request: elements.requestInput.value,
            fileName: elements.fileDropdown.options[elements.fileDropdown.selectedIndex].text,
            repoName: elements.repoDropdown.options[elements.repoDropdown.selectedIndex].text
        });
        console.log('Received response:', data); // Debug line
        handleResponse(data);
    } catch (error) {
        console.error('Error:', error); // Debug line
    } finally {
        elements.submitBtn.textContent = "Submit";
        elements.loader.classList.add("hidden");
    }
};

const handleResponse = (response) => {
    console.log('Handling response...'); // Debug line
    let updatedTab;
    response.forEach(file => {
        console.log('Processing file:', file.fileName); // Debug line
        const existingTab = Array.from(document.querySelectorAll('.tab')).find(tab => tab.querySelector('span').textContent === file.fileName);
        if (existingTab) {
            console.log('Updating existing tab:', existingTab); // Debug line
            existingTab.dataset.content = file.fileContents;
            updatedTab = existingTab;
        } else {
            console.log('Creating new tab for:', file.fileName); // Debug line
            const tab = createTab(file);
            document.getElementById('tabs').appendChild(tab);
            updatedTab = tab;
        }
        updatedCode = file.fileContents;
        console.log('Updated code:', updatedCode); // Debug line
    });
    // Check if hot.html tab exists
    const hotHtmlTab = Array.from(document.querySelectorAll('.tab')).find(tab => tab.querySelector('span').textContent === 'hot.html');
    if (!hotHtmlTab) {
        // If hot.html tab doesn't exist, create it
        const hotHtmlFile = { fileName: 'hot.html', fileContents: '', newFile: true };
        const hotHtmlTab = createTab(hotHtmlFile);
        document.getElementById('tabs').appendChild(hotHtmlTab);
    }
    // Activate the updated tab
    $(updatedTab).click();
    toggleView("outputBtn");
    updateCodeContent(elements.fileDropdown.value);
    elements.saveBtn.classList.remove("hidden");
};

const createTab = (file) => {
    const tab = document.createElement('div');
    tab.className = `tab px-4 py-2 mr-2 bg-gray-200 hover:bg-gray-300 rounded-t-lg flex items-center justify-between ${file.newFile ? 'border-b-2 border-green-400' : ''}`;
    tab.innerHTML = `
        <span class="text-sm">${file.fileName}</span>
        <i data-feather="x-circle" class="ml-2 hover:bg-gray-400 rounded-full p-1 cursor-pointer"></i>
    `;
    tab.dataset.content = file.fileContents;
    tab.setAttribute('newFile', file.newFile ? 'true' : 'false'); // Set the newFile attribute
    feather.replace();
    tab.addEventListener('click', () => {
        elements.codeBox.textContent = tab.dataset.content;
        $('.tab').removeClass('bg-gray-300');
        tab.classList.add('bg-gray-300');
        activeTab = tab; // Update the activeTab when a tab is clicked
    });
    tab.querySelector('i').addEventListener('click', (e) => {
        e.stopPropagation();
        tab.remove();
    });
    return tab;
};

const saveCodeFile = async () => {
    if (!activeTab) {
        console.error("No active tab found.");
        return;
    }
    console.log(activeTab,'active Tab')
    const fileName = activeTab.querySelector('span').textContent;
    console.log(fileName,'file name')
    const fileContents = activeTab.dataset.content;
    console.log(activeTab,'activeTab')
    const isNewFile = activeTab.getAttribute('newFile') === 'true'; // Check if the tab is a new file

    console.log(isNewFile,'newFile')

    const fileUrlParts = elements.fileDropdown.value.split("/");
    const repoIndex = fileUrlParts.indexOf("grandcanyonsmith") + 1;
    const repoName = fileUrlParts[repoIndex];
    const branchName = fileUrlParts[repoIndex + 1];

    try {
        let data;
        if (isNewFile) {
            // If it's a new file, send a POST request to the specified URL
            const response = await axios.post('https://flask-hello-world2-three.vercel.app/create_new_file', {
                repo_name: repoName,
                file_name: fileName,
                file_contents: fileContents,
                branch_name: branchName
            });
            data = response.data;
        } else {
            // If it's not a new file, send a POST request to the original URL
            const response = await axios.post(urls.update, {
                repo_name: repoName,
                file_name: fileName,
                file_contents: fileContents,
                branch_name: branchName
            });
            data = response.data;
        }
        console.log("Response from server:", data);
    } catch (error) {
        console.error("Error occurred while saving file:", error);
        if (error.response && error.response.status === 500) {
            alert("Server error. Please try again later.");
        }
    } finally {
        elements.saveBtn.classList.add("hidden");
    }
};

const updateCodeBox = () => {
    updateCodeContent(elements.fileDropdown.value);
    elements.runBtn.classList.toggle("hidden", !elements.fileDropdown.value.endsWith(".py"));
    const tabs = document.getElementById('tabs');
    tabs.innerHTML = '';
};

const updateFileDropdown = () => {
    populateFileDropdown(elements.repoDropdown.value);
    const tabs = document.getElementById('tabs');
    tabs.innerHTML = '';
};

const populateRepoDropdown = async () => {
    const { data } = await axios.get(urls.getRepos);
    data.forEach(repo => elements.repoDropdown.append(new Option(repo, repo)));
};

const populateFileDropdown = async (repo) => {
    const { data } = await axios.get(`${urls.getFiles}${repo}/contents`);
    elements.fileDropdown.innerHTML = "";
    elements.fileDropdown.append(new Option("Select a file", ""));
    data.forEach(file => elements.fileDropdown.append(new Option(file.name, file.download_url)));
};

const updateCodeContent = async (fileUrl) => {
    if (updatedCode) {
        elements.codeBox.textContent = updatedCode;
    } else {
        const { data } = await axios.get(fileUrl);
        elements.codeBox.textContent = data;
    }
    Prism.highlightAll();
};

addEventListeners();
populateRepoDropdown();
};

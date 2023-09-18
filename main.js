window.onload = function() {
    let updatedCode = null;
    let activeTab = null;
    const elements = ["sourceBtn", "outputBtn", "submitBtn", "saveBtn", "runBtn", "loader", "codeBox", "outputBox", "repoDropdown", "fileDropdown", "requestInput"]
        .reduce((obj, id) => ({
            ...obj,
            [id]: document.getElementById(id)
        }), {});

    const urls = {
  runCode: "https://xhy5at2dbpxeys62rsx4f6lfay0yigqt.lambda-url.us-west-2.on.aws/",
  submitRequest: "https://uslbd6l6ssolgomdrcdhnqa5me0rnsee.lambda-url.us-west-2.on.aws/",
  getRepos: "https://flask-hello-world2-three.vercel.app/github_repos_list",
  getFiles: "https://flask-hello-world2-git-main-grandcanyonsmith.vercel.app/github_repos/",
  update: "https://flask-hello-world2-three.vercel.app/update",
        create: 'https://flask-hello-world2-three.vercel.app/create_new_file'
};

    const addEventListeners = () => {
        Object.entries(elements).forEach(([key, element]) => {
            element.addEventListener("click", key === 'sourceBtn' || key === 'outputBtn' ? () => toggleView(key) :
                key === 'submitBtn' ? submitCodeRequest :
                key === 'saveBtn' ? saveCodeFile :
                key === 'runBtn' ? executeCode : null);
        });

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
        outputBoxElement.innerHTML = "";
        outputBoxElement.style.overflow = "auto";

        if (!selectedFileUrl.endsWith(".html")) {
            outputBoxElement.textContent = codeBoxContent;
            return;
        }

        const iframe = document.createElement("iframe");
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "0";
        outputBoxElement.appendChild(iframe);

        const injectedCode = injectCode(codeBoxContent);
        const iframeDoc = iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(injectedCode);
        iframeDoc.close();
    };

    const getFileType = (fileName) => {
        if (fileName.endsWith('.css')) return 'css';
        if (fileName.endsWith('.js')) return 'js';
        if (fileName.endsWith('.json')) return 'json';
    };

    const injectCode = (htmlCode) => {
        const tabs = Array.from(document.querySelectorAll('.tab'));
        let code = {
            css: '',
            js: '',
            json: []
        };

        tabs.forEach(tab => {
            const fileType = getFileType(tab.querySelector('span').textContent);
            code[fileType] += tab.dataset.content || tab.dataset.content.push(fileType);
        });

        return `
            <!DOCTYPE html>
            <html>
            <head>
                <style>${code.css}</style>
                ${code.json.map(fileName => `<script src="${fileName}"></script>`).join('\n')}
            </head>
            <body>
                ${htmlCode}
                <script>${code.js}</script>
            </body>
            </html>
        `;
    };

    async function executeCode() {
        elements.runBtn.textContent = "Running...";
        try {
            const {
                data
            } = await axios.post(urls.runCode, {
                code: elements.codeBox.textContent
            });
            elements.outputBox.textContent = data;
            toggleView("outputBtn");
        } catch (error) {
            console.error(error);
        } finally {
            elements.runBtn.textContent = "Run";
            elements.loader.classList.add("hidden");
        }
    }

    const getSelectedOptionText = (dropdown) => dropdown.options[dropdown.selectedIndex].text;

    const submitCodeRequest = async () => {
        elements.submitBtn.textContent = "Loading...";
        try {
            const payload = {
                code: elements.codeBox.textContent,
                request: elements.requestInput.value,
                fileName: getSelectedOptionText(elements.fileDropdown),
                repoName: getSelectedOptionText(elements.repoDropdown)
            };

            const {
                data
            } = await axios.post(urls.submitRequest, payload);
            handleResponse(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            elements.submitBtn.textContent = "Submit";
            elements.loader.classList.add("hidden");
        }
    };


    const handleResponse = (response) => {
        const tabs = Array.from(document.querySelectorAll('.tab'));
        let updatedTab;

        response.forEach(file => {
            let tab = tabs.find(tab => tab.querySelector('span').textContent === file.fileName);

            if (!tab) {
                tab = createTab(file);
                document.getElementById('tabs').appendChild(tab);
            }

            tab.dataset.content = file.fileContents;
            updatedTab = tab;
        });

        // Activate the updated tab
        $(updatedTab).click();
        toggleView("outputBtn");
        updateCodeContent(elements.fileDropdown.value);
        elements.saveBtn.classList.remove("hidden");
    };

    const createTab = (file) => {
        const tab = document.createElement('div');
        tab.className = `tab px-4 py-2 mr-2 bg-gray-200 hover:bg-gray-300 rounded-t-lg flex items-center justify-between ${file.newFile ? 'border-b-2 border-green-400' : ''}`;
        tab.dataset.content = file.fileContents;
        tab.setAttribute('newFile', file.newFile ? 'true' : 'false');

        const span = document.createElement('span');
        span.className = "text-sm";
        span.textContent = file.fileName;
        tab.appendChild(span);

        const icon = document.createElement('i');
        icon.dataset.feather = "x-circle";
        icon.className = "ml-2 hover:bg-gray-400 rounded-full p-1 cursor-pointer";
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            tab.remove();
        });
        tab.appendChild(icon);

        feather.replace();

        tab.addEventListener('click', () => {
            elements.codeBox.textContent = tab.dataset.content;
            $('.tab').removeClass('bg-gray-300');
            tab.classList.add('bg-gray-300');
            activeTab = tab;
        });

        return tab;
    };


//         const saveCodeFile = async () => {
//     if (!activeTab) {
//         console.error("No active tab found.");
//         return;
//     }

//     const fileName = activeTab.querySelector('span').textContent;
//     const fileContents = activeTab.dataset.content;
//     const isNewFile = activeTab.getAttribute('newFile') === 'true';

//     const [, , , repoName, branchName] = elements.fileDropdown.value.split("/");

//     const url = isNewFile ? 'https://flask-hello-world2-three.vercel.app/create_new_file' : `https://flask-hello-world2-three.vercel.app/update`;
//     const payload = {
//         repo_name: repoName,
//         file_name: fileName,
//         file_contents: fileContents,
//         branch_name: branchName
//     };

//     try {
//         const { data } = await axios.post(url, payload);
//         console.log("Response from server:", data);
//     } catch (error) {
//         console.error("Error occurred while saving file:", error);
//         if (error.response?.status === 500) {
//             alert("Server error. Please try again later.");
//         }
//     } finally {
//         elements.saveBtn.classList.add("hidden");
//     }
// };
// const saveCodeFile = async () => {
//     if (!activeTab) {
//         console.error("No active tab found.");
//         return;
//     }
//     console.log(activeTab,'active Tab')
//     const fileName = activeTab.querySelector('span').textContent;
//     console.log(fileName,'file name')
//     const fileContents = activeTab.dataset.content;
//     console.log(activeTab,'activeTab')
//     const isNewFile = activeTab.getAttribute('newFile') === 'true'; // Check if the tab is a new file

//     console.log(isNewFile,'newFile')

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
    const getRepoData = () => {
    const fileUrlParts = elements.fileDropdown.value.split("/");
    const repoIndex = fileUrlParts.indexOf("grandcanyonsmith") + 1;
    const repoName = fileUrlParts[repoIndex];
    const branchName = fileUrlParts[repoIndex + 1];

    return { repoName, branchName };
};


const getPayload = (fileName, fileContents, repoName, branchName) => {
    return {
        repo_name: repoName,
        file_name: fileName,
        file_contents: fileContents,
        branch_name: branchName
    };
};
const getActiveTabData = () => {
    if (!activeTab) {
        console.error("No active tab found.");
        return null;
    }

    const fileName = activeTab.querySelector('span').textContent;
    const fileContents = activeTab.dataset.content;
    const isNewFile = activeTab.getAttribute('newFile') === 'true';

    return { fileName, fileContents, isNewFile };
};
    const saveCodeFile = async () => {
    const activeTabData = getActiveTabData();
    if (!activeTabData) return;

    const repoData = getRepoData();
    const payload = getPayload(activeTabData.fileName, activeTabData.fileContents, repoData.repoName, repoData.branchName);

    let url;
    if (activeTabData.isNewFile) {
        url = 'https://flask-hello-world2-three.vercel.app/create_new_file';
    } else {
        url = 'https://flask-hello-world2-three.vercel.app/update';
    }

    try {
        const { data } = await axios.post(url, payload);
        console.log("Response from server:", data);
    } catch (error) {
        console.error("Error occurred while saving file:", error);
        if (error.response?.status === 500) {
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
        const {
            data
        } = await axios.get(urls.getRepos);
        data.forEach(repo => elements.repoDropdown.append(new Option(repo, repo)));
    };

    const populateFileDropdown = async (repo) => {
        const {
            data
        } = await axios.get(`${urls.getFiles}${repo}/contents`);
        elements.fileDropdown.innerHTML = "";
        elements.fileDropdown.append(new Option("Select a file", ""));
        data.forEach(file => elements.fileDropdown.append(new Option(file.name, file.download_url)));
    };

    const updateCodeContent = async (fileUrl) => {
        if (updatedCode) {
            elements.codeBox.textContent = updatedCode;
        } else {
            const {
                data
            } = await axios.get(fileUrl);
            elements.codeBox.textContent = data;
        }
        Prism.highlightAll();
    };

    addEventListeners();
    populateRepoDropdown();
};

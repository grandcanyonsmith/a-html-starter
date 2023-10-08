const API_ENDPOINT = 'https://nyk43gzspnm7wfhwqrc4uaprya0ecdap.lambda-url.us-west-2.on.aws/';
let selectedRepositoryName = '';
let filePath = '';

function getFileNameExtension(fileName) {
    return fileName.split('.').pop();
}

function getPrismLanguage(extension) {
    const languageMap = {
        'py': 'python',
        'js': 'javascript',
        'css': 'css',
        'html': 'markup'
    };
    return languageMap[extension] || '';
}

function setPrismLanguage(fileName, fileContents) {
    const extension = getFileNameExtension(fileName);
    const language = getPrismLanguage(extension);
    const codeElement = document.getElementById('code');
    codeElement.className = 'language-' + language;
    codeElement.innerHTML = Prism.highlight(fileContents, Prism.languages[language], language);
}

async function fetchFileContents() {
    try {
        const response = await axios.post(API_ENDPOINT, {
            request: 'get_file_contents',
            file_path: filePath,
            repo_name: selectedRepositoryName
        });
        setPrismLanguage(filePath, response.data.file_content);
    } catch (error) {
        console.error(error);
    }
}

async function fetchRepositoryContents() {
    try {
        const response = await axios.post(API_ENDPOINT, {
            request: 'get_all_contents',
            repo_name: selectedRepositoryName
        });
        const filesAndFolders = response.data;
        populateFilesDropdown(filesAndFolders);
    } catch (error) {
        console.error(error);
    }
}

function toggleRepositoryContents() {
    const fileDropdown = document.getElementById('fileDropdown');
    if (fileDropdown.classList.contains('hidden')) {
        fileDropdown.classList.remove('hidden');
    } else {
        fileDropdown.classList.add('hidden');
    }
}

function populateFilesDropdown(contents) {
    const filesDropdown = document.getElementById('fileDropdown');
    filesDropdown.innerHTML = '';

    contents.forEach((content, index) => {
        const displayName = extractNameFromPath(content.path);
        if(content.type === "file") {
            filesDropdown.innerHTML += createFileElement(displayName);
            if(index === 0) {
                document.getElementById('fileTitle').textContent = displayName;
                filePath = content.path;
                fetchFileContents();
            }
        }
        if(content.type === "dir") {
            filesDropdown.innerHTML += createDirectoryElement(content);
        }
    });
    feather.replace();
}

function extractNameFromPath(path) {
    return path.split('/').pop();
}

function createFileElement(fileName) {
    return `<a href="#" class="block px-4 py-2 text-sm hover:bg-gray-200" onclick="changeTitleAndHide('${fileName}')">${fileName}</a>`;
}

function createDirectoryElement(directory) {
    let directoryElement = `<div class="mt-1"><span class="flex items-center px-4 py-2 text-sm cursor-pointer select-none" onclick="this.nextElementSibling.classList.toggle('hidden'); this.children[1].classList.toggle('rotate-180'); changeTitleAndHide('${extractNameFromPath(directory.path)}')">${extractNameFromPath(directory.path)} <i data-feather="chevron-down" class="ml-1 w-4 h-4 transform"></i></span><div class="border-l-2 border-gray-200 pl-2 hidden">`;
    directory.contents.forEach(content => {
        if(content.type === "file") {
            directoryElement += createFileElement(extractNameFromPath(content.path));
        }
    });
    directoryElement += '</div></div>';
    return directoryElement;
}

function changeTitleAndHide(title) {
    document.getElementById('fileTitle').textContent = title;
    document.getElementById('fileDropdown').classList.add('hidden');
    filePath = title;
    fetchFileContents();
}

function toggleGithubRepositories() {
    const repoList = document.getElementById('repoList');
    if (repoList.classList.contains('hidden')) {
        repoList.classList.remove('hidden');
    } else {
        repoList.classList.add('hidden');
    }
}

feather.replace();
fetchRepositoryContents();
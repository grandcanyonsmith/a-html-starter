class RepositoryManager {
    constructor() {
        this.API_ENDPOINT = 'https://nyk43gzspnm7wfhwqrc4uaprya0ecdap.lambda-url.us-west-2.on.aws/';
    }

    getFileNameExtension(fileName) {
        return fileName.split('.').pop();
    }

    getPrismLanguage(extension) {
        const languageMap = {
            'py': 'python',
            'js': 'javascript',
            'css': 'css',
            'html': 'markup'
        };
        return languageMap[extension] || '';
    }

    setPrismLanguage(fileName, fileContents) {
        const extension = this.getFileNameExtension(fileName);
        const language = this.getPrismLanguage(extension);
        const codeElement = document.getElementById('code');
        codeElement.className = 'language-' + language;
        codeElement.innerHTML = Prism.highlight(fileContents, Prism.languages[language], language);
    }

    async fetchFileContents(selectedRepositoryName) {
        try {
            const filePath = document.getElementById('fileTitle').textContent;
            const response = await axios.post(this.API_ENDPOINT, {
                request: 'get_file_contents',
                file_path: filePath,
                repo_name: selectedRepositoryName
            });
            this.setPrismLanguage(filePath, response.data.file_content);
        } catch (error) {
            console.error(error);
        }
    }

    async fetchRepositoryContents(selectedRepositoryName) {
        try {
            const response = await axios.post(this.API_ENDPOINT, {
                request: 'get_all_contents',
                repo_name: selectedRepositoryName
            });
            const filesAndFolders = response.data;
            this.populateFilesDropdown(filesAndFolders);
        } catch (error) {
            console.error(error);
        }
    }

    toggleRepositoryContents() {
        const fileDropdown = document.getElementById('fileDropdown');
        if (fileDropdown.classList.contains('hidden')) {
            fileDropdown.classList.remove('hidden');
        } else {
            fileDropdown.classList.add('hidden');
        }
    }

    populateFilesDropdown(contents) {
        const filesDropdown = document.getElementById('fileDropdown');
        filesDropdown.innerHTML = '';

        contents.forEach((content, index) => {
            const displayName = this.extractNameFromPath(content.path);
            if(content.type === "file") {
                filesDropdown.innerHTML += this.createFileElement(displayName);
                if(index === 0) {
                    document.getElementById('fileTitle').textContent = displayName;
                    this.fetchFileContents(document.getElementById('repoName').textContent);
                }
            }
            if(content.type === "dir") {
                filesDropdown.innerHTML += this.createDirectoryElement(content);
            }
        });
        feather.replace();
    }

    extractNameFromPath(path) {
        return path.split('/').pop();
    }

    createFileElement(fileName) {
        return `<a href="#" class="block px-4 py-2 text-sm hover:bg-gray-200" onclick="changeTitleAndHide('${fileName}')">${fileName}</a>`;
    }

    createDirectoryElement(directory) {
        let directoryElement = `<div class="mt-1"><span class="flex items-center px-4 py-2 text-sm cursor-pointer select-none" onclick="this.nextElementSibling.classList.toggle('hidden'); this.children[1].classList.toggle('rotate-180'); changeTitleAndHide('${this.extractNameFromPath(directory.path)}')">${this.extractNameFromPath(directory.path)} <i data-feather="chevron-down" class="ml-1 w-4 h-4 transform"></i></span><div class="border-l-2 border-gray-200 pl-2 hidden">`;
        directory.contents.forEach(content => {
            if(content.type === "file") {
                directoryElement += this.createFileElement(this.extractNameFromPath(content.path));
            }
        });
        directoryElement += '</div></div>';
        return directoryElement;
    }

    changeTitleAndHide(title) {
        const fileTitle = document.getElementById('fileTitle');
        if (fileTitle.textContent !== title) {
            fileTitle.textContent = title;
            document.getElementById('fileDropdown').classList.add('hidden');
            this.fetchFileContents(document.getElementById('repoName').textContent);
        }
    }

    toggleGithubRepositories() {
        const repoList = document.getElementById('repoList');
        if (repoList.classList.contains('hidden')) {
            repoList.classList.remove('hidden');
        } else {
            repoList.classList.add('hidden');
        }
    }

    init() {
        feather.replace();
        this.fetchRepositoryContents(document.getElementById('repoName').textContent);
    }
}

const repoManager = new RepositoryManager();
repoManager.init();
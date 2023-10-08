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

    extractNameFromPath(path) {
        return path.split('/').pop();
    }

    changeTitleAndHide(title) {
        const fileTitle = document.getElementById('fileTitle');
        if (fileTitle.textContent !== title) {
            fileTitle.textContent = title;
            document.getElementById('fileDropdown').classList.add('hidden');
            this.fetchFileContents(document.getElementById('repoName').textContent);
        }
    }

    init() {
        feather.replace();
        this.fetchFileContents(document.getElementById('repoName').textContent);
    }
}

const repoManager = new RepositoryManager();
repoManager.init();
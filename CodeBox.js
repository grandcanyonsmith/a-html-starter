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
        let filePath = document.getElementById('filePath').textContent;
        console.log(filePath,'file path')
        if (!filePath.startsWith('/')) {
            filePath = '/' + filePath;
        }
        console.log(filePath,'newfilepath')
        
        if(!axios || !this.API_ENDPOINT) {
            console.error('Axios or API endpoint is undefined');
            return;
        }
        
        const response = await axios.post(this.API_ENDPOINT, {
            request: 'get_file_contents',
            file_path: filePath,
            repo_name: selectedRepositoryName
        });
        
        if(response.status === 200) {
            if(response.data.file_content) {
                this.setPrismLanguage(filePath, response.data.file_content);
            } else {
                console.error('File content is empty');
            }
        } else {
            console.error('Error fetching file contents', response.status);
        }
    } catch (error) {
        console.error('Error in fetchFileContents:', error.message);
        console.error('Error details:', error);
    }
}

    extractNameFromPath(path) {
        return path.split('/').pop();
    }

    changeTitleAndHide(title, path) {
        const fileTitle = document.getElementById('fileTitle');
        document.getElementById('filePath').textContent = path;
         console.log(path,'path')
        if (fileTitle.textContent !== title) {
            fileTitle.textContent = title;
            document.getElementById('filePath').textContent = path;
            console.log(path,'path')
            document.getElementById('fileDropdown').classList.add('hidden');
            this.fetchFileContents(document.getElementById('repoName').textContent);
        }
    }

    init() {
        feather.replace();
    }
}

const repoManager = new RepositoryManager();

// Constants
const API_ENDPOINT = 'https://nyk43gzspnm7wfhwqrc4uaprya0ecdap.lambda-url.us-west-2.on.aws/';
const HIDDEN_CLASS = 'hidden';
const SELECTORS = {
  fileDropdown: 'fileDropdown',
  searchBar: 'searchBar',
  createFileBtn: 'createFileBtn',
  fileTitle: 'fileTitle',
  createNewFileModalWindow: 'createNewFileModalWindow',
  newFileContentsInput: 'newFileContentsInput',
  newFileNameInput: 'newFileNameInput',
  createNewFileButton: 'createNewFileButton',
  submitCreateFileButton: 'submitCreateFileButton',
  cancelButton: 'cancelButton'
};

class RepositoryManager {
  constructor() {
    this.selectedRepositoryName = 'a-canyon-yb-tests';
    this.filesAndFolders = [];
  }

  async fetchRepositoryContents() {
    try {
      const response = await axios.post(`${API_ENDPOINT}`, {
        request: 'get_all_contents',
        repo_name: this.selectedRepositoryName
      });
      this.filesAndFolders = response.data;
      this.populateFilesDropdown(this.filesAndFolders);
    } catch (error) {
      console.error(`Error fetching repository contents: ${error}`);
      alert('An error occurred while fetching the repository contents. Please try again.');
    }
  }

  toggleRepositoryContents() {
    const elementsToToggle = [SELECTORS.fileDropdown, SELECTORS.searchBar, SELECTORS.createFileBtn];
    elementsToToggle.forEach(id => {
      const element = document.getElementById(id);
      element.classList.toggle(HIDDEN_CLASS);
    });
  }

  populateFilesDropdown(contents) {
    const filesDropdown = document.getElementById(SELECTORS.fileDropdown);
    filesDropdown.innerHTML = ''; 
    contents.forEach((content, index) => {
      const displayName = this.extractFileNameFromPath(content.path);
      if(content.type === "file") {
        filesDropdown.appendChild(this.createFileElement(displayName));
        if(index === 0) {
          document.getElementById(SELECTORS.fileTitle).textContent = displayName;
        }
      }
      if(content.type === "dir") {
        filesDropdown.appendChild(this.createDirectoryElement(content));
      }
    });
    feather.replace();
  }

  extractFileNameFromPath(path) {
    return path.split('/').pop();
  }

  createFileElement(fileName) {
    const fileElement = document.createElement('a');
    fileElement.href = '#';
    fileElement.className = 'block px-4 py-2 text-sm hover:bg-gray-200';
    fileElement.textContent = fileName;
    fileElement.addEventListener('click', () => this.changeTitleAndHide(fileName));
    return fileElement;
  }

  createDirectoryElement(directory) {
    // Similar to createFileElement, but create directory elements
    // ...
  }

  changeTitleAndHide(title) {
    document.getElementById(SELECTORS.fileTitle).textContent = title;
    this.toggleRepositoryContents();
  }

  searchFilesAndFolders(query) {
    const filteredContents = this.filesAndFolders.filter(content => content.path.includes(query));
    this.populateFilesDropdown(filteredContents);
  }

  openCreateNewFileModal() {
    document.getElementById(SELECTORS.createNewFileModalWindow).classList.remove(HIDDEN_CLASS);
  }

  closeCreateNewFileModal() {
    document.getElementById(SELECTORS.createNewFileModalWindow).classList.add(HIDDEN_CLASS);
  }

  async submitFile() {
    const newFileNameInput = document.getElementById(SELECTORS.newFileNameInput);
    const newFileContentsInput = document.getElementById(SELECTORS.newFileContentsInput);
    if (!newFileNameInput.value || !newFileContentsInput.value) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const response = await axios.post(API_ENDPOINT, {
        request: 'create_new_file',
        file_contents: newFileContentsInput.value,
        file_name: newFileNameInput.value,
        repo_name: this.selectedRepositoryName,
      });
      alert(`Data: ${response.data}\nStatus: ${response.status}`);
      this.closeCreateNewFileModal();
    } catch (error) {
      console.error(`Error submitting file: ${error}`);
      alert('An error occurred while submitting the file. Please try again.');
    }
  }

  init() {
    document.getElementById(SELECTORS.createNewFileButton).addEventListener('click', this.openCreateNewFileModal.bind(this));
    document.getElementById(SELECTORS.submitCreateFileButton).addEventListener('click', this.submitFile.bind(this));
    document.getElementById(SELECTORS.cancelButton).addEventListener('click', this.closeCreateNewFileModal.bind(this));
    feather.replace();
    this.fetchRepositoryContents();
  }
}

// On load
window.onload = () => {
  const repoManager = new RepositoryManager();
  repoManager.init();
};

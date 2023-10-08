function fetchFiles() {
  const selectedRepoName = document.getElementById('repositoryName').value;
  console.log(selectedRepoName);
  repoFileSelector.fetchRepositoryContents(selectedRepoName);
}

class RepoFileSelector {
  constructor() {
    this.API_ENDPOINT = 'https://nyk43gzspnm7wfhwqrc4uaprya0ecdap.lambda-url.us-west-2.on.aws/';
    this.HIDDEN_CLASS = 'hidden';
    this.selectedRepositoryName = '';
    this.filesAndFolders = [];
    this.createNewFileModalWindow = document.getElementById('createNewFileModalWindow');
    this.newFileContentsInput = document.getElementById('newFileContentsInput');
    this.newFileNameInput = document.getElementById('newFileNameInput');
    this.changeTitleAndHide = this.changeTitleAndHide.bind(this);
  }

  async fetchRepositoryContents(repoName) {
    this.selectedRepositoryName = repoName;
    try {
      const response = await axios.post(`${this.API_ENDPOINT}`, {
        request: 'get_all_contents',
        repo_name: this.selectedRepositoryName
      });
      this.filesAndFolders = response.data;
      this.populateFilesDropdown(this.filesAndFolders);
      this.toggleRepositoryContents();
    } catch (error) {
      console.error(`Error fetching repository contents: ${error}`);
    }
  }

  toggleRepositoryContents() {
    const elementsToToggle = ['fileDropdown', 'searchBar', 'createFileBtn'];
    elementsToToggle.forEach(id => {
      const element = document.getElementById(id);
      element.classList.toggle(this.HIDDEN_CLASS);
    });
  }

  populateFilesDropdown(contents) {
    const filesDropdown = document.getElementById('fileDropdown');
    filesDropdown.innerHTML = '';
    contents.forEach((content, index) => {
      const displayName = this.extractFileNameFromPath(content.path);
      if(content.type === "file") {
        filesDropdown.innerHTML += this.createFileElement(displayName);
        if(index === 0) {
          document.getElementById('fileTitle').textContent = displayName;
        }
      }
      if(content.type === "dir") {
        filesDropdown.innerHTML += this.createDirectoryElement(content);
      }
    });
    feather.replace();
  }

  extractFileNameFromPath(path) {
    return path.split('/').pop();
  }

  createFileElement(fileName) {
    return `<a href="#" class="block px-4 py-2 text-sm hover:bg-gray-200" onclick="repoFileSelector.changeTitleAndHide('${fileName}')">${fileName}</a>`;
  }

  createDirectoryElement(directory) {
    let directoryElement = `<div class="mt-1"><span class="flex items-center px-4 py-2 text-sm cursor-pointer select-none" onclick="this.nextElementSibling.classList.toggle('hidden'); this.children[1].classList.toggle('rotate-180'); this.changeTitleAndHide('${this.extractFileNameFromPath(directory.path)}')">${this.extractFileNameFromPath(directory.path)} <i data-feather="chevron-down" class="ml-1 w-4 h-4 transform"></i></span><div class="border-l-2 border-gray-200 pl-2 hidden">`;
    directory.contents.forEach(content => {
      if(content.type === "file") {
        directoryElement += this.createFileElement(this.extractFileNameFromPath(content.path));
      }
      if(content.type === "dir") {
        directoryElement += this.createDirectoryElement(content);
      }
    });
    directoryElement += '</div></div>';
    return directoryElement;
  }

  changeTitleAndHide(title) {
    document.getElementById('fileTitle').textContent = title;
    this.toggleRepositoryContents();
  }

  searchFilesAndFolders(query) {
    const filteredContents = this.filesAndFolders.filter(content => content.path.includes(query));
    this.populateFilesDropdown(filteredContents);
  }

  openCreateNewFileModal() {
    this.createNewFileModalWindow.classList.remove(this.HIDDEN_CLASS);
  }

  closeCreateNewFileModal() {
    this.createNewFileModalWindow.classList.add(this.HIDDEN_CLASS);
  }

  async submitFile() {
    if (!this.newFileNameInput.value || !this.newFileContentsInput.value) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const response = await axios.post(this.API_ENDPOINT, {
        request: 'create_new_file',
        file_contents: this.newFileContentsInput.value,
        file_name: this.newFileNameInput.value,
        repo_name: this.selectedRepositoryName,
      });
      alert(`Data: ${response.data}\nStatus: ${response.status}`);
      this.closeCreateNewFileModal();
    } catch (error) {
      console.error(`Error submitting file: ${error}`);
      alert('An error occurred while submitting the file. Please try again.');
    }
  }
}

const repoFileSelector = new RepoFileSelector();
// Constants
const API_ENDPOINT = 'https://nyk43gzspnm7wfhwqrc4uaprya0ecdap.lambda-url.us-west-2.on.aws/';
const HIDDEN_CLASS = 'hidden';
let selectedRepositoryName = 'a-canyon-yb-tests';
let filesAndFolders = [];

// Fetch repository contents
const fetchRepositoryContents = async () => {
  try {
    const response = await axios.post(`${API_ENDPOINT}`, {
      request: 'get_all_contents',
      repo_name: selectedRepositoryName
    });
    filesAndFolders = response.data;
    populateFilesDropdown(filesAndFolders);
  } catch (error) {
    console.error(`Error fetching repository contents: ${error}`);
  }
}

// Toggle repository contents
const toggleRepositoryContents = () => {
  const elementsToToggle = ['fileDropdown', 'searchBar', 'createFileBtn'];
  elementsToToggle.forEach(id => {
    const element = document.getElementById(id);
    element.classList.toggle(HIDDEN_CLASS);
  });
}

// Populate files dropdown
const populateFilesDropdown = (contents) => {
  const filesDropdown = document.getElementById('fileDropdown');
  filesDropdown.innerHTML = ''; 
  contents.forEach((content, index) => {
    const displayName = extractFileNameFromPath(content.path);
    if(content.type === "file") {
      filesDropdown.innerHTML += createFileElement(displayName);
      if(index === 0) {
        document.getElementById('fileTitle').textContent = displayName;
      }
    }
    if(content.type === "dir") {
      filesDropdown.innerHTML += createDirectoryElement(content);
    }
  });
  feather.replace();
}

// Extract file name from path
const extractFileNameFromPath = (path) => path.split('/').pop();

// Create file element
const createFileElement = (fileName) => `<a href="#" class="block px-4 py-2 text-sm hover:bg-gray-200" onclick="changeTitleAndHide('${fileName}')">${fileName}</a>`;

// Create directory element
const createDirectoryElement = (directory) => {
  let directoryElement = `<div class="mt-1"><span class="flex items-center px-4 py-2 text-sm cursor-pointer select-none" onclick="this.nextElementSibling.classList.toggle('hidden'); this.children[1].classList.toggle('rotate-180'); changeTitleAndHide('${extractFileNameFromPath(directory.path)}')">${extractFileNameFromPath(directory.path)} <i data-feather="chevron-down" class="ml-1 w-4 h-4 transform"></i></span><div class="border-l-2 border-gray-200 pl-2 hidden">`;
  directory.contents.forEach(content => {
    if(content.type === "file") {
      directoryElement += createFileElement(extractFileNameFromPath(content.path));
    }
    if(content.type === "dir") {
      directoryElement += createDirectoryElement(content);
    }
  });
  directoryElement += '</div></div>';
  return directoryElement;
}

// Change title and hide
const changeTitleAndHide = (title) => {
  document.getElementById('fileTitle').textContent = title;
  toggleRepositoryContents();
}

// Search files and folders
const searchFilesAndFolders = (query) => {
  const filteredContents = filesAndFolders.filter(content => content.path.includes(query));
  populateFilesDropdown(filteredContents);
}

// Create new file modal window
const createNewFileModalWindow = document.getElementById('createNewFileModalWindow');
const newFileContentsInput = document.getElementById('newFileContentsInput');
const newFileNameInput = document.getElementById('newFileNameInput');

// Open create new file modal
const openCreateNewFileModal = () => createNewFileModalWindow.classList.remove(HIDDEN_CLASS);

// Close create new file modal
const closeCreateNewFileModal = () => createNewFileModalWindow.classList.add(HIDDEN_CLASS);

// Submit file
const submitFile = async () => {
  if (!newFileNameInput.value || !newFileContentsInput.value) {
    alert('Please fill out all fields.');
    return;
  }

  try {
    const response = await axios.post(API_ENDPOINT, {
      request: 'create_new_file',
      file_contents: newFileContentsInput.value,
      file_name: newFileNameInput.value,
      repo_name: selectedRepositoryName,
    });
    alert(`Data: ${response.data}\nStatus: ${response.status}`);
    closeCreateNewFileModal();
  } catch (error) {
    console.error(`Error submitting file: ${error}`);
    alert('An error occurred while submitting the file. Please try again.');
  }
}

// Event listeners
document.getElementById('createNewFileButton').addEventListener('click', openCreateNewFileModal);
document.getElementById('submitCreateFileButton').addEventListener('click', submitFile);
document.getElementById('cancelButton').addEventListener('click', closeCreateNewFileModal);

// On load
window.onload = () => {
  feather.replace();
  fetchRepositoryContents();
};

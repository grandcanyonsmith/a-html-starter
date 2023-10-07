const API_ENDPOINT = 'https://nyk43gzspnm7wfhwqrc4uaprya0ecdap.lambda-url.us-west-2.on.aws/';
let filesAndFolders = [];

async function fetchRepositoryContents(repo_name) {
  try {
    const response = await axios.post(API_ENDPOINT, {
      request: 'get_all_contents',
      repo_name: repo_name
    });
    filesAndFolders = response.data;
    populateFilesDropdown(filesAndFolders);
  } catch (error) {
    console.error(error);
  }
}

function toggleRepositoryContents() {
  const fileDropdown = document.getElementById('fileDropdown');
  const searchBar = document.getElementById('searchBar');
  const createFileBtn = document.getElementById('createFileBtn');
  fileDropdown.classList.toggle('hidden');
  searchBar.classList.toggle('hidden');
  createFileBtn.classList.toggle('hidden');
}

function populateFilesDropdown(contents) {
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

function extractFileNameFromPath(path) {
  return path.split('/').pop();
}

function createFileElement(fileName) {
  return `<a href="#" class="block px-4 py-2 text-sm hover:bg-gray-200" onclick="changeTitleAndHide('${fileName}')">${fileName}</a>`;
}

function createDirectoryElement(directory) {
  let directoryElement = `<div class="mt-1"><span class="flex items-center px-4 py-2 text-sm cursor-pointer select-none" onclick="this.nextElementSibling.classList.toggle('hidden'); this.children[1].classList.toggle('rotate-180'); changeTitleAndHide('${extractFileNameFromPath(directory.path)}')">${extractFileNameFromPath(directory.path)} <i data-feather="chevron-down" class="ml-1 w-4 h-4 transform"></i></span><div class="border-l-2 border-gray-200 pl-2 hidden">`;
    directory.contents.forEach(content => {
      if(content.type === "file") {
        directoryElement += createFileElement(extractFileNameFromPath(content.path));
      }
    });
    directoryElement += '</div></div>';
    return directoryElement;
  }

function changeTitleAndHide(title) {
  document.getElementById('fileTitle').textContent = title;
  toggleRepositoryContents();
}

function searchFilesAndFolders(query) {
  const filteredContents = filesAndFolders.filter(content => content.path.includes(query));
  populateFilesDropdown(filteredContents);
}

function createNewFile() {
  // Add your logic to create a new file
}
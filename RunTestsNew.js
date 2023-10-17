const API_ENDPOINT =
  "https://nyk43gzspnm7wfhwqrc4uaprya0ecdap.lambda-url.us-west-2.on.aws/";
const SUBMIT_REQUEST_API_ENDPOINT =
  "https://uslbd6l6ssolgomdrcdhnqa5me0rnsee.lambda-url.us-west-2.on.aws/";
const HIDDEN_CLASS = "hidden";

const SELECTORS = {
  fileDropdown: "fileDropdown",
  searchBar: "searchBar",
  createFileBtn: "createFileBtn",
  fileTitle: "fileTitle",
  createNewFileModalWindow: "createNewFileModalWindow",
  newFileContentsInput: "newFileContentsInput",
  newFileNameInput: "newFileNameInput",
  createNewFileButton: "createNewFileButton",
  submitCreateFileButton: "submitCreateFileButton",
  cancelButton: "cancelButton",
  filePath: "filePath"
};

const URLS = {
  runCode:
    "https://xhy5at2dbpxeys62rsx4f6lfay0yigqt.lambda-url.us-west-2.on.aws/"
};

class RepositoryManager {
  constructor() {
    this.selectedRepositoryName = "a-canyon-yb-tests";
    this.filesAndFolders = [];
  }

  async fetchFileContents() {
    let filePath = document.getElementById(SELECTORS.filePath).textContent;
    filePath = filePath.startsWith("/") ? filePath : "/" + filePath;

    try {
      const response = await axios.post(API_ENDPOINT, {
        request: "get_file_contents",
        file_path: filePath,
        repo_name: this.selectedRepositoryName
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching file contents:", error.message);
    }
  }

  async fetchRepositoryContents() {
    try {
      const response = await axios.post(API_ENDPOINT, {
        request: "get_all_contents",
        repo_name: this.selectedRepositoryName
      });
      if (response.data && Array.isArray(response.data)) {
        this.filesAndFolders = response.data;
        this.populateFilesDropdown(this.filesAndFolders);
      } else {
        console.error("Unexpected response data format");
      }
    } catch (error) {
      console.error(`Error fetching repository contents: ${error}`);
      alert(
        "An error occurred while fetching the repository contents. Please try again."
      );
    }
  }

  toggleElementsVisibility(elements, className) {
    elements.forEach((id) =>
      document.getElementById(id).classList.toggle(className)
    );
  }

  populateFilesDropdown(contents) {
    const filesDropdown = document.getElementById(SELECTORS.fileDropdown);
    filesDropdown.innerHTML = "";
    contents.forEach((content, index) => {
      const displayName = this.extractFileNameFromPath(content.path);
      if (content.type === "file") {
        filesDropdown.appendChild(this.createFileElement(displayName));
        if (index === 0) {
          document.getElementById(
            SELECTORS.fileTitle
          ).textContent = displayName;
        }
      }
      if (content.type === "dir") {
        filesDropdown.appendChild(this.createDirectoryElement(content));
      }
    });
  }

  extractFileNameFromPath(path) {
    return path.split("/").pop();
  }

  createFileElement(fileName, filePath) {
    const fileElement = document.createElement("a");
    fileElement.href = "#";
    fileElement.className = "block px-4 py-2 text-sm hover:bg-gray-200";
    fileElement.textContent = fileName;
    fileElement.addEventListener("click", () =>
      this.changeTitleAndHide(fileName, filePath)
    );
    return fileElement;
  }

  createDirectoryElement(directory) {
    const directoryElement = document.createElement("div");
    const directoryContentElement = this.createDirectoryContentElement(
      directory.contents
    );
    const spanElement = this.createSpanElement(directory.path);

    directoryElement.appendChild(spanElement);
    directoryElement.appendChild(directoryContentElement);

    return directoryElement;
  }

  createDirectoryContentElement(contents) {
    const directoryContentElement = document.createElement("div");
    directoryContentElement.className =
      "border-l-2 border-gray-200 pl-2 hidden";

    contents.forEach((content) => {
      if (content.type === "file") {
        directoryContentElement.appendChild(
          this.createFileElement(
            this.extractFileNameFromPath(content.path),
            content.path
          )
        );
      }
      if (content.type === "dir") {
        directoryContentElement.appendChild(
          this.createDirectoryElement(content)
        );
      }
    });

    return directoryContentElement;
  }

  createSpanElement(path) {
    const spanElement = document.createElement("span");
    spanElement.className =
      "flex items-center px-4 py-2 text-sm cursor-pointer select-none";

    const fileNameElement = document.createElement("span");
    fileNameElement.textContent = this.extractFileNameFromPath(path);
    fileNameElement.addEventListener("click", () =>
      this.changeTitleAndHide(this.extractFileNameFromPath(path))
    );

    spanElement.appendChild(fileNameElement);
    spanElement.innerHTML +=
      ' <i data-feather="chevron-down" class="ml-1 w-4 h-4 transform"></i>';

    spanElement.addEventListener("click", (event) => {
      event.currentTarget.nextElementSibling.classList.toggle("hidden");
      event.currentTarget.children[1].classList.toggle("rotate-180");
    });

    return spanElement;
  }

  async changeTitleAndHide(title, filePath) {
    document.getElementById(SELECTORS.fileTitle).textContent = title;
    this.toggleElementsVisibility(
      [SELECTORS.fileDropdown, SELECTORS.searchBar, SELECTORS.createFileBtn],
      HIDDEN_CLASS
    );
    document.getElementById("filePath").textContent = filePath;

    const fileContents = await this.fetchFileContents();
    document.getElementById("codeBox").innerHTML = Prism.highlight(
      fileContents.file_content,
      Prism.languages.python,
      "python"
    );
  }

  searchFilesAndFolders(query) {
    const filteredContents = this.filesAndFolders.filter((content) =>
      content.path.includes(query)
    );
    this.populateFilesDropdown(filteredContents);
  }

  openCreateNewFileModal() {
    document
      .getElementById(SELECTORS.createNewFileModalWindow)
      .classList.remove(HIDDEN_CLASS);
  }

  closeCreateNewFileModal() {
    document
      .getElementById(SELECTORS.createNewFileModalWindow)
      .classList.add(HIDDEN_CLASS);
  }

  async submitFile() {
    const newFileNameInput = document.getElementById(
      SELECTORS.newFileNameInput
    );
    const newFileContentsInput = document.getElementById(
      SELECTORS.newFileContentsInput
    );
    if (!newFileNameInput.value || !newFileContentsInput.value) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post(API_ENDPOINT, {
        request: "create_new_file",
        file_contents: newFileContentsInput.value,
        file_name: newFileNameInput.value,
        repo_name: this.selectedRepositoryName
      });
      alert(`Data: ${response.data}\nStatus: ${response.status}`);
      this.closeCreateNewFileModal();
    } catch (error) {
      console.error(`Error submitting file: ${error}`);
      alert("An error occurred while submitting the file. Please try again.");
    }
  }

  init() {
    // document.getElementById(SELECTORS.createNewFileButton).addEventListener("click", this.openCreateNewFileModal.bind(this));
    // document.getElementById(SELECTORS.submitCreateFileButton).addEventListener("click", this.submitFile.bind(this));
    // document.getElementById(SELECTORS.cancelButton).addEventListener("click", this.closeCreateNewFileModal.bind(this));
    this.fetchRepositoryContents();
  }
}

async function submit() {
  const codeBox = document.getElementById("codeBox");
  const requestInput = document.getElementById("requestInput");
  const fileName = document.getElementById(SELECTORS.filePath).textContent;
  const repoName = "a-canyon-yb-tests";
  const code = codeBox.textContent;
  const request = requestInput.value;

  const data = {
    code: code,
    request: request,
    fileName: fileName,
    repoName: repoName
  };

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.innerHTML = "Loading..."; // Change button text to 'Loading...'

  try {
    const response = await axios.post(SUBMIT_REQUEST_API_ENDPOINT, data);
    if (response.data && response.data.length > 0) {
      const fileContents = response.data[0].fileContents;
      codeBox.textContent = fileContents;
      Prism.highlightAll();
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    submitBtn.innerHTML = '<i data-feather="send"></i>'; // Change button text back to the send icon
    feather.replace(); // Re-initialize Feather Icons
  }
}
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function runTests() {
  const testResult = document.getElementById("testResult");
  const codeBox = document.getElementById("codeBox");
  const filePath = document.getElementById(SELECTORS.filePath).textContent;

  const runTestsBtn = document.getElementById("runTestsBtn");
  runTestsBtn.innerHTML = "Running..."; // Change button text to 'Running...'

  testResult.innerHTML = `<pre>Running Tests in EC2 instance</pre>`;

  try {
    const response = await axios.post(URLS.runCode, {
      code: codeBox.textContent,
      filePath: filePath
    });
    let output = escapeHtml(response.data.output);
    let error = escapeHtml(response.data.error);
    testResult.innerHTML = `<pre>Output:\n ${output} \n Error:\n ${error}</pre>`;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    runTestsBtn.innerHTML = '<i data-feather="play"></i>'; // Change button text back to the play icon
    feather.replace(); // Re-initialize Feather Icons
  }
}

async function saveCode() {
  const repoName = "a-canyon-yb-tests"; // replace with actual repo name
  const fileName = document.getElementById(SELECTORS.filePath).textContent;
  const fileContents = document.getElementById("codeBox").textContent; // replace with actual file contents
  const branchName = "master"; // replace with actual branch name if needed

  const data = {
    repo_name: repoName,
    file_contents: fileContents,
    file_name: fileName,
    request: "update",
    branch_name: branchName
  };
  console.log(data, "data");
  try {
    const response = await axios.post(API_ENDPOINT, data);
    console.log(response.data);
  } catch (error) {
    console.error(`Error saving file: ${error}`);
  }
}
let repoManager;
window.onload = () => {
  repoManager = new RepositoryManager();
  repoManager.init();
  const commitModalContainer = document.getElementById("commitModalContainer");
  const branchName = document.getElementById("branch-name");
  const commitMessage = document.getElementById("commit-message");

  function toggleCommitModal(isVisible) {
    commitModalContainer.style.display = isVisible ? "block" : "none";
  }

  function commitChanges() {
    alert(
      `Branch Name: ${branchName.value}\nCommit Message: ${commitMessage.value}`
    );
    branchName.value = "";
    commitMessage.value = "";
    toggleCommitModal(false);
  }

  document
    .getElementById("closeCommitModalBtn")
    .addEventListener("click", () => toggleCommitModal(false));
  document
    .getElementById("cancelCommitModalBtn")
    .addEventListener("click", () => toggleCommitModal(false));
  document
    .getElementById("commitChangesBtn")
    .addEventListener("click", commitChanges);
  document
    .getElementById("saveBtn")
    .addEventListener("click", () => toggleCommitModal(true));
  toggleCommitModal(false);
  document.getElementById("submitBtn").addEventListener("click", submit);
  document.getElementById("saveBtn").classList.remove("hidden");
  document.getElementById("saveBtn").addEventListener("click", saveCode);
  document.getElementById("runTestsBtn").addEventListener("click", runTests);
  feather.replace(); // Add this line
};

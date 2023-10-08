// window.onload = () => {
//   const searchInput = document.getElementById("searchInput");

//   searchInput.addEventListener("keyup", function() {
//     repoFileSelector.searchFilesAndFolders(this.value);
//   });

//   document.getElementById('fetchFilesBtn').addEventListener('click', fetchFiles);
//   feather.replace();
//   document.getElementById('createNewFileButton').addEventListener('click', () => repoFileSelector.openCreateNewFileModal());
//   document.getElementById('submitCreateFileButton').addEventListener('click', () => repoFileSelector.submitFile());
//   document.getElementById('cancelButton').addEventListener('click', () => repoFileSelector.closeCreateNewFileModal());
//   const chevronIcon = document.getElementById('chevronIcon');
//   if (chevronIcon) {
//     chevronIcon.addEventListener('click', () => {
//       const selectedRepoName = document.getElementById('selectedRepoName').value;
//       repoFileSelector.fetchRepositoryContents(selectedRepoName);
//     });
//   }

//   document.getElementById('showFileContentsBtn').addEventListener('click', () => {
//     const selectedRepoName = document.getElementById('selectedRepoName').value;
//     repoManager.fetchFileContents(selectedRepoName);
//   });

//   window.githubRepoManager = new GithubRepoManager();
// };


window.onload = () => {
  const searchInput = document.getElementById("searchInput");
  const fetchFilesBtn = document.getElementById('fetchFilesBtn');
  const createNewFileButton = document.getElementById('createNewFileButton');
  const submitCreateFileButton = document.getElementById('submitCreateFileButton');
  const cancelButton = document.getElementById('cancelButton');
  const chevronIcon = document.getElementById('chevronIcon');
  const showFileContentsBtn = document.getElementById('showFileContentsBtn');
  const selectedRepoName = document.getElementById('selectedRepoName');

  if(searchInput) {
    searchInput.addEventListener("keyup", function() {
      repoFileSelector.searchFilesAndFolders(this.value);
    });
  }

  if(fetchFilesBtn) {
    fetchFilesBtn.addEventListener('click', fetchFiles);
  }

  if(createNewFileButton) {
    createNewFileButton.addEventListener('click', () => repoFileSelector.openCreateNewFileModal());
  }

  if(submitCreateFileButton) {
    submitCreateFileButton.addEventListener('click', () => repoFileSelector.submitFile());
  }

  if(cancelButton) {
    cancelButton.addEventListener('click', () => repoFileSelector.closeCreateNewFileModal());
  }

  if(chevronIcon && selectedRepoName) {
    chevronIcon.addEventListener('click', () => {
      repoFileSelector.fetchRepositoryContents(selectedRepoName.value);
    });
  }

  if(showFileContentsBtn && selectedRepoName) {
    showFileContentsBtn.addEventListener('click', () => {
      repoManager.fetchFileContents(selectedRepoName.value);
    });
  }

  window.githubRepoManager = new GithubRepoManager();
};

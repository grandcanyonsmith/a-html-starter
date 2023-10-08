window.onload = () => {
  // Code from repoFileSelector.js
  document.getElementById('fetchFilesBtn').addEventListener('click', fetchFiles);
  feather.replace();
  document.getElementById('createNewFileButton').addEventListener('click', () => repoFileSelector.openCreateNewFileModal());
  document.getElementById('submitCreateFileButton').addEventListener('click', () => repoFileSelector.submitFile());
  document.getElementById('cancelButton').addEventListener('click', () => repoFileSelector.closeCreateNewFileModal());
  const chevronIcon = document.getElementById('chevronIcon');
  if (chevronIcon) {
    chevronIcon.addEventListener('click', () => {
      const selectedRepoName = document.getElementById('selectedRepoName').value;
      repoFileSelector.fetchRepositoryContents(selectedRepoName);
    });
  }

  // Code from repoSelect.js
  window.githubRepoManager = new GithubRepoManager();
};

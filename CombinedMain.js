window.onload = () => {
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("keyup", function() {
    repoFileSelector.searchFilesAndFolders(this.value);
  });

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
  
  document.getElementById('showFileContentsBtn').addEventListener('click', () => repoManager.fetchFileContents(document.getElementById('repoName').textContent));

  window.githubRepoManager = new GithubRepoManager();
};

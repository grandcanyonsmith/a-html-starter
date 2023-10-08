window.onload = () => {
  // Assuming you have a search input with the id "searchInput"
const searchInput = document.getElementById("searchInput");

// Add an event listener to the search input
searchInput.addEventListener("keyup", function() {
  // When the user types into the search box, call searchFilesAndFolders
  // with the current value of the search input
  repoFileSelector.searchFilesAndFolders(this.value);
});
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

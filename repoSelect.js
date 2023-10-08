const API_ENDPOINT = 'https://nyk43gzspnm7wfhwqrc4uaprya0ecdap.lambda-url.us-west-2.on.aws/';

class GithubRepoManager {
  constructor() {
    this.selectedRepositoryName = '';
    this.repositories = [];
    this.repoList = document.getElementById('repoList');
    this.searchDiv = document.getElementById('searchDiv');
    this.searchInput = document.getElementById('searchInput');
    this.repoName = document.getElementById('repoName');
    this.fetchReposBtn = document.getElementById('fetchReposBtn');
  }

  setupEventListeners() {
    this.fetchReposBtn.addEventListener('click', () => this.toggleGithubRepositories());
    this.searchInput.addEventListener('keyup', () => this.filterRepositories());
  }

  async fetchGithubRepositories() {
    try {
      const response = await axios.post(API_ENDPOINT, { request: 'github_repos' });
      this.repositories = response.data;
      this.populateRepositoriesDropdown();
      this.setSelectedRepository(this.repositories[0].name);
    } catch (error) {
      console.error(error);
      // Show error to user
    }
  }

  toggleGithubRepositories() {
    if (this.repoList.classList.contains('hidden')) {
      this.showRepos();
      this.searchDiv.style.display = "flex";
    } else {
      this.hideRepos();
      this.searchDiv.style.display = "none";
    }
  }

  showRepos() {
    this.repoList.classList.remove('hidden');
  }

  hideRepos() {
    this.repoList.classList.add('hidden');
    this.searchDiv.style.display = "none";
  }

  populateRepositoriesDropdown() {
    this.repoList.innerHTML = '';
    this.repositories.forEach(repository => {
      const repoElement = this.createRepoElement(repository.name);
      this.repoList.appendChild(repoElement);
    });
  }

  createRepoElement(repositoryName) {
    const repoElement = document.createElement('li');
    repoElement.textContent = repositoryName;
    repoElement.addEventListener('click', () => this.setSelectedRepository(repositoryName));
    return repoElement;
  }

  setSelectedRepository(repositoryName) {
    this.selectedRepositoryName = repositoryName;
    this.repoName.textContent = repositoryName;
    this.hideRepos();
  }

  filterRepositories() {
    const filter = this.searchInput.value.toUpperCase();
    const repoItems = this.repoList.getElementsByTagName('li');
    for (let i = 0; i < repoItems.length; i++) {
      let txtValue = repoItems[i].textContent || repoItems[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        repoItems[i].style.display = "";
      } else {
        repoItems[i].style.display = "none";
      }
    }
  }
}

let githubRepoManager; // Declare it globally

window.onload = () => {
  githubRepoManager = new GithubRepoManager(); // Assign the instance to the global variable
  githubRepoManager.setupEventListeners();
  githubRepoManager.fetchGithubRepositories();
};

// const ELEMENT_IDS = [
//     "sourceBtn",
//     "outputBtn",
//     "submitBtn",
//     "saveBtn",
//     "runBtn",
//     "loader",
//     "codeBox",
//     "outputBox",
//     "repoDropdown",
//     "fileDropdown",
//     "requestInput"
//   ];
  
//   const URLS = {
//     runCode: "https://xhy5at2dbpxeys62rsx4f6lfay0yigqt.lambda-url.us-west-2.on.aws/",
//     submitRequest: "https://uslbd6l6ssolgomdrcdhnqa5me0rnsee.lambda-url.us-west-2.on.aws/",
//     getRepos: "https://flask-hello-world2-three.vercel.app/github_repos_list",
//     getFiles: "https://flask-hello-world2-git-main-grandcanyonsmith.vercel.app/github_repos/",
//     update: "https://flask-hello-world2-three.vercel.app/update",
//     create: "https://flask-hello-world2-three.vercel.app/create_new_file"
//   };
  
//   const saveBtn = document.getElementById('saveBtn');
//   saveBtn.addEventListener('click', async function() {
//     try {
//       await CodeSaver.saveCodeFile();
//     } catch (error) {
//       console.error('Error occurred while saving file:', error);
//     }
//   });

//   let elements = {};
//   let activeTab = null;
  
//   class UI {
//     static switchView(targetId) {
//       const isSourceView = targetId === "sourceBtn";
//       elements.codeBox.classList.toggle("hidden", !isSourceView);
//       elements.outputBox.classList.toggle("hidden", isSourceView);
  
//       if (!isSourceView) {
//         this.displayOutput(
//           elements.fileDropdown.value,
//           elements.codeBox.textContent,
//           elements.outputBox
//         );
//         Prism.highlightAll();
//       }
//     }
//     static toggleView(targetId) {
//       if (targetId === "sourceBtn") {
//         UI.switchToSourceView();
//       } else {
//         UI.switchToOutputView();
//       }
//     }
  
//     static switchToSourceView() {
//       elements.codeBox.classList.remove("hidden");
//       elements.outputBox.classList.add("hidden");
//     }
  
//     static switchToOutputView() {
//       elements.codeBox.classList.add("hidden");
//       elements.outputBox.classList.remove("hidden");
//       UI.displayOutput(
//         elements.fileDropdown.value,
//         elements.codeBox.textContent,
//         elements.outputBox
//       );
//       Prism.highlightAll();
//     }
  
//     static displayOutput(selectedFileUrl, codeBoxContent, outputBoxElement) {
//       outputBoxElement.innerHTML = "";
//       outputBoxElement.style.overflow = "auto";
  
//       if (selectedFileUrl.endsWith(".html")) {
//         UI.displayHtmlOutput(codeBoxContent, outputBoxElement);
//       } else {
//         UI.displayNonHtmlOutput(codeBoxContent, outputBoxElement);
//       }
//     }
  
//     static displayHtmlOutput(htmlCode, outputBoxElement) {
//       const iframe = document.createElement("iframe");
//       iframe.style.width = "100%";
//       iframe.style.height = "100%";
//       iframe.style.border = "0";
//       outputBoxElement.appendChild(iframe);
  
//       const injectedCode = UI.injectCode(htmlCode);
//       const iframeDoc = iframe.contentWindow.document;
//       iframeDoc.open();
//       iframeDoc.write(injectedCode);
//       iframeDoc.close();
//     }
  
//     static displayNonHtmlOutput(codeBoxContent, outputBoxElement) {
//       outputBoxElement.textContent = codeBoxContent;
//     }
  
//     static injectCode(htmlCode) {
//       const tabs = Array.from(document.querySelectorAll(".tab"));
//       let code = {
//         css: "",
//         js: "",
//         json: []
//       };
  
//       tabs.forEach((tab) => {
//         const fileType = UI.getFileType(tab.querySelector("span").textContent);
//         code[fileType] += tab.dataset.content || tab.dataset.content.push(fileType);
//       });
  
//       return `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <style>${code.css}</style>
//             ${code.json
//               .map((fileName) => `<script src="${fileName}"></script>`)
//               .join("\n")}
//         </head>
//         <body>
//             ${htmlCode}
//             <script>${code.js}</script>
//         </body>
//         </html>
//       `;
//     }
  
//     static getFileType(fileName) {
//       if (fileName.endsWith(".css")) return "css";
//       if (fileName.endsWith(".js")) return "js";
//       if (fileName.endsWith(".json")) return "json";
//     }
  
//     static updateUIBeforeExecution() {
//       elements.runBtn.textContent = "Running...";
//     }
  
//     static updateUIAfterExecution() {
//       elements.runBtn.textContent = "Run";
//       elements.loader.classList.add("hidden");
//     }
  
//     static updateUIBeforeSubmission() {
//       elements.submitBtn.textContent = "Loading...";
//     }
  
//     static updateUIAfterSubmission() {
//       elements.submitBtn.textContent = "Submit";
//       elements.loader.classList.add("hidden");
//     }
  
//     static updateUIAfterResponse(updatedTab) {
//       $(updatedTab).click();
//       UI.toggleView("outputBtn");
//     }
//   }
  
//   class CodeRunner {
//     static async executeCode() {
//       try {
//         UI.updateUIBeforeExecution();
//         const data = await CodeRunner.runCode();
//         UI.displayOutputData(data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         UI.updateUIAfterExecution();
//       }
//     }
  
//     static async runCode() {
//       const response = await axios.post(URLS.runCode, {
//         code: elements.codeBox.textContent
//       });
//       return response.data;
//     }
  
//     static displayOutputData(data) {
//       elements.outputBox.textContent = data;
//       UI.toggleView("outputBtn");
//     }
//   }
  
//   class CodeSubmitter {
//     static async submitCodeRequest() {
//       UI.updateUIBeforeSubmission();
//       try {
//         const payload = CodeSubmitter.preparePayload();
//         const data = await CodeSubmitter.submitRequest(payload);
//         CodeSubmitter.handleResponse(data);
//       } catch (error) {
//         console.error("Error:", error.message);
//         console.error("Stack:", error.stack);
//       } finally {
//         UI.updateUIAfterSubmission();
//       }
//     }

//     static getSelectedOptionText(dropdown) {
//         return dropdown.options[dropdown.selectedIndex].text;
//       }
  
//     static preparePayload() {
//       return {
//         code: elements.codeBox.textContent,
//         request: elements.requestInput.value,
//         fileName: CodeSubmitter.getSelectedOptionText(elements.fileDropdown),
//         repoName: CodeSubmitter.getSelectedOptionText(elements.repoDropdown)
//       };
//     }
  
//     static async submitRequest(payload) {
//       const response = await axios.post(URLS.submitRequest, payload);
//       return response.data;
//     }
  
//     static handleResponse(response) {
//         const updatedTabs = response.map(CodeSubmitter.handleFile);
//         const updatedTab = updatedTabs[updatedTabs.length - 1];
//         UI.updateUIAfterResponse(updatedTab);
//         // Remove the following line
//         // CodeSubmitter.getFileContent(elements.fileDropdown.value);
//         elements.saveBtn.classList.remove("hidden");
//         UI.toggleView("outputBtn"); // Add this line
//       }
  
//     static handleFile(file) {
//       let tab = CodeSubmitter.findTab(file.fileName);
//       if (!tab) {
//         tab = CodeSubmitter.createTab(file);
//         document.getElementById("tabs").appendChild(tab);
//       }
//       tab.dataset.content = file.fileContents;
//       return tab;
//     }
  
//     static findTab(fileName) {
//       const tabs = Array.from(document.querySelectorAll(".tab"));
//       return tabs.find((tab) => tab.querySelector("span").textContent === fileName);
//     }
  
//     static createTab(file) {
//       const tab = document.createElement("div");
//       tab.className = `tab px-4 py-2 mr-2 bg-gray-200 hover:bg-gray-300 rounded-t-lg flex items-center justify-between ${
//         file.newFile ? "border-b-2 border-green-400" : ""
//       }`;
//       tab.dataset.content = file.fileContents;
//       tab.setAttribute("newFile", file.newFile ? "true" : "false");
  
//       const span = document.createElement("span");
//       span.className = "text-sm";
//       span.textContent = file.fileName;
//       tab.appendChild(span);
  
//       const icon = document.createElement("i");
//       icon.dataset.feather = "x-circle";
//       icon.className = "ml-2 hover:bg-gray-400 rounded-full p-1 cursor-pointer";
//       icon.addEventListener("click", (e) => {
//         e.stopPropagation();
//         tab.remove();
//       });
//       tab.appendChild(icon);
  
//       feather.replace();
  
//       tab.addEventListener("click", () => {
//         elements.codeBox.textContent = tab.dataset.content;
//         $(".tab").removeClass("bg-gray-300");
//         tab.classList.add("bg-gray-300");
//         activeTab = tab;
//       });
  
//       return tab;
//     }
  
//     static async getFileContent(fileUrl) {
//         const response = await axios.get(fileUrl);
//         const fileExtension = fileUrl.split(".").pop();
//         let language;
//         switch (fileExtension) {
//           case "html":
//             language = "markup";
//             break;
//           case "js":
//             language = "javascript";
//             break;
//           case "css":
//             language = "css";
//             break;
//           case "py":
//             language = "python";
//             break;
//           default:
//             language = "markup";
//         }
//         // Add the language class without removing existing classes
//         elements.codeBox.className = "language-" + language;
//         elements.codeBox.textContent = response.data;
//         Prism.highlightAll();
//         UI.displayOutput(fileUrl, response.data, elements.outputBox); // Add this line
//         UI.switchToOutputView();
//     }
//   }
  
//   class CodeSaver {
//     static getActiveTabData() {
//         if (!activeTab) return null;
//         return {
//             fileName: CodeSaver.getTabFileName(activeTab),
//             fileContents: CodeSaver.getTabFileContents(activeTab),
//             isNewFile: CodeSaver.isTabNewFile(activeTab)
//         };
//     }

//     static async saveCodeFile() {
//         const activeTabData = CodeSaver.getActiveTabData();
//         if (!activeTabData) return;
    
//         const repoData = CodeSaver.getRepoData();
//         const payload = CodeSaver.getPayload(
//             activeTabData.fileName,
//             activeTabData.fileContents,
//             repoData.repoName,
//             repoData.branchName
//         );
    
//         console.log('Save payload:', payload); // Add this line to log the payload
    
//         let url;
//         console.log(url,'url')
//         if (activeTabData.isNewFile) {
//             url = URLS.create;
//         } else {
//             url = URLS.update;
//         }
    
//         try {
//             const { data } = await axios.post(url, payload);
//             console.log("Response from server:", data);
//         } catch (error) {
//             console.error("Error occurred while saving file:", error);
//             if (error.response?.status === 500) {
//                 alert("Server error. Please try again later.");
//             }
//         } finally {
//             elements.saveBtn.classList.add("hidden");
//         }
//     }
  
//     static getTabFileName(tab) {
//       return tab.querySelector("span").textContent;
//     }
  
//     static getTabFileContents(tab) {
//       return tab.dataset.content;
//     }
  
//     static isTabNewFile(tab) {
//       return tab.getAttribute("newFile") === "true";
//     }
  
//     static getRepoData() {
//       const fileUrlParts = elements.fileDropdown.value.split("/");
//       const repoIndex = fileUrlParts.indexOf("grandcanyonsmith") + 1;
//       const repoName = fileUrlParts[repoIndex];
//       const branchName = fileUrlParts[repoIndex + 1];
  
//       return { repoName, branchName };
//     }
  
//     static getPayload(fileName, fileContents, repoName, branchName) {
//         fileName = fileName.replace('📄 ', '').trim(); // Add trim() to remove leading and trailing spaces
//         return {
//             repo_name: repoName,
//             file_name: fileName,
//             file_contents: fileContents,
//             branch_name: branchName
//         };
//     }
//   }
  
//   class DropdownManager {
//     static async updateFileDropdown() {
//       await DropdownManager.populateFileDropdown(elements.repoDropdown.value);
//       const tabs = document.getElementById("tabs");
//       tabs.innerHTML = "";
//     }
  
//     static handleFileSelection() {
//         CodeSubmitter.getFileContent(elements.fileDropdown.value);
//         elements.runBtn.classList.toggle(
//           "hidden",
//           !elements.fileDropdown.value.endsWith(".py")
//         );
//         const tabs = document.getElementById("tabs");
//         while (tabs.firstChild) {
//           tabs.removeChild(tabs.firstChild);
//         }
//         UI.switchToOutputView();
//       }
  
//     static async populateRepoDropdown() {
//       const { data } = await axios.get(URLS.getRepos);
//       data.forEach((repo) => elements.repoDropdown.append(new Option(repo, repo)));
//     }
  
//     static async populateFileDropdown(repo) {
//       const {
//         data
//       } = await axios.post(
//         "https://flask-hello-world2-git-main-grandcanyonsmith.vercel.app/get_all_contents",
//         { repo_name: repo }
//       );
//       elements.fileDropdown.innerHTML = "";
//       elements.fileDropdown.append(new Option("Select a file", ""));
//       DropdownManager.populateDropdownWithResponseData(data);
//     }
  
//     static populateDropdownWithResponseData(data, parentPath = "", depth = 0) {
//       const indent = "\u00A0\u00A0".repeat(depth * 2);
//       data.forEach((item) => {
//         const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name;
//         if (item.type === "file") {
//           elements.fileDropdown.append(
//             new Option(`${indent}📄 ${itemPath}`, item.download_url)
//           );
//         } else if (item.type === "dir") {
//           elements.fileDropdown.append(new Option(`${indent}📁 ${itemPath}`, ""));
//           DropdownManager.populateDropdownWithResponseData(item.contents, itemPath, depth + 1);
//         }
//       });
//     }
//   }
  
//   class Main {
//     static async init() {
//       elements = Main.getElementsById(ELEMENT_IDS);
//       Main.addEventListeners();
//       await DropdownManager.populateRepoDropdown();
//     }
  
//     static getElementsById(ids) {
//       return ids.reduce(
//         (obj, id) => ({ ...obj, [id]: document.getElementById(id) }),
//         {}
//       );
//     }
  
//     static addEventListeners() {
//       Main.addClickListenersToButtons();
//       Main.addChangeListenersToDropdowns();
//       feather.replace();
//     }
  
//     static addClickListenersToButtons() {
//       const buttonActions = {
//         sourceBtn: () => UI.toggleView("sourceBtn"),
//         outputBtn: () => UI.toggleView("outputBtn"),
//         submitBtn: CodeSubmitter.submitCodeRequest,
//         saveBtn: CodeSaver.saveCodeFile,
//         runBtn: CodeRunner.executeCode
//       };
  
//       Object.entries(buttonActions).forEach(([id, action]) => {
//         elements[id].addEventListener("click", action);
//       });
//     }
  
//     static addChangeListenersToDropdowns() {
//       elements.repoDropdown.addEventListener("change", DropdownManager.updateFileDropdown);
//       elements.fileDropdown.addEventListener("change", DropdownManager.handleFileSelection);
//     }
//   }
  
//   window.onload = Main.init;








      function closeModal() {
        document.getElementById("myModal").style.display = "none";
      }

      function openModal() {
  document.getElementById("myModal").style.display = "block";
  newDropDownManager.populateRepoDropdown(); // populate the dropdown when the modal is opened
}
      class newDropDownManager {
             static async updateFileDropdown() {
    console.log('updateFileDropdown called'); // Check if function is called
    NEW_ELEMENTS.fileDropdown.innerHTML = ""; // clear the dropdown
    await newDropDownManager.populateFileDropdown(NEW_ELEMENTS.repoDropdown.value);
  }
        static handleFileSelection() {
    let selectedFile =
      NEW_ELEMENTS.fileDropdown.options[NEW_ELEMENTS.fileDropdown.selectedIndex].text;
    const selectedRepo =
      NEW_ELEMENTS.repoDropdown.options[NEW_ELEMENTS.repoDropdown.selectedIndex].text;
    selectedFile = selectedFile.replace("📄 ", "").trim(); // Remove '📄 ' and leading/trailing whitespace from the file name
    const textBox = document.getElementById("textBox");
    const appendString = `\n<<<{"repo_name":"${selectedRepo}","file_name":"${selectedFile}"}>>>`;
    textBox.value = textBox.value + appendString;
    NEW_ELEMENTS.runBtn.classList.toggle(
      "hidden",
      !NEW_ELEMENTS.fileDropdown.value.endsWith(".py")
    );
    // Close the modal
    closeModal();
    // Reset the dropdowns
    NEW_ELEMENTS.repoDropdown.value = "";
    NEW_ELEMENTS.fileDropdown.value = "";
  }
        poDropdown() {
  console.log('populateRepoDropdown called'); // Check if function is called
  axios.get(NEW_URLS.getRepos)
    .then(({ data }) => {
      console.log('Data received:', data); // Check the data received from the server
      data.forEach((repo) => {
        console.log('Adding repo:', repo); // Check each repo being added
        NEW_ELEMENTS.repoDropdown.append(new Option(repo, repo));
      });
    })
    .catch(error => {
      console.error('Error fetching repos:', error);
    });
}
        static async populateFileDropdown(repo) {
          const {
            data
          } = await axios.post(
            "https://flask-hello-world2-git-main-grandcanyonsmith.vercel.app/get_all_contents", {
              repo_name: repo
            }
          );
          NEW_ELEMENTS.fileDropdown.innerHTML = "";
          NEW_ELEMENTS.fileDropdown.append(new Option("Select a file", ""));
          newDropDownManager.populateDropdownWithResponseData(data);
        }
        
             static populateRepoDropdown() {
    console.log('populateRepoDropdown called'); // Check if function is called
    NEW_ELEMENTS.repoDropdown.innerHTML = ""; // clear the dropdown
    axios.get(NEW_URLS.getRepos)
      .then(({ data }) => {
        console.log('Data received:', data); // Check the data received from the server
        data.forEach((repo) => {
          console.log('Adding repo:', repo); // Check each repo being added
          NEW_ELEMENTS.repoDropdown.append(new Option(repo, repo));
        });
        NEW_ELEMENTS.repoDropdown.addEventListener(
          "change",
          newDropDownManager.updateFileDropdown
        );
      })
      .catch(error => {
        console.error('Error fetching repos:', error);
      });
  }
        static populateDropdownWithResponseData(data, parentPath = "", depth = 0) {
          const indent = "\u00A0\u00A0".repeat(depth * 2);
          data.forEach((item) => {
            const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name;
            if (item.type === "file") {
              NEW_ELEMENTS.fileDropdown.append(
                new Option(`${indent}📄 ${itemPath}`, item.download_url)
              );
            } else if (item.type === "dir") {
              NEW_ELEMENTS.fileDropdown.append(new Option(`${indent}📁 ${itemPath}`, ""));
              newDropDownManager.populateDropdownWithResponseData(
                item.contents,
                itemPath,
                depth + 1
              );
            }
          });
        }
      }
      const NEW_URLS = {
        getRepos: "https://flask-hello-world2-three.vercel.app/github_repos_list",
        getFiles: "https://flask-hello-world2-git-main-grandcanyonsmith.vercel.app/github_repos/"
      };
      const NEW_ELEMENTS = {
  repoDropdown: document.getElementById("repoOptions"),
  fileDropdown: document.getElementById("options"),
  runBtn: document.getElementById("runBtn")
};
      window.onload = function() {
  newDropDownManager.populateRepoDropdown();
  document.getElementById("options").addEventListener(
    "change",
    function() {
      if (this.value) {
        newDropDownManager.handleFileSelection();
      }
    }
  );
};



const ELEMENT_IDS = [
    "sourceBtn",
    "outputBtn",
    "submitBtn",
    "saveBtn",
    "runBtn",
    "loader",
    "codeBox",
    "outputBox",
    "repoDropdown",
    "fileDropdown",
    "textBox"
  ];
  
  const URLS = {
    runCode: "https://xhy5at2dbpxeys62rsx4f6lfay0yigqt.lambda-url.us-west-2.on.aws/",
    submitRequest: "https://uslbd6l6ssolgomdrcdhnqa5me0rnsee.lambda-url.us-west-2.on.aws/",
    getRepos: "https://flask-hello-world2-three.vercel.app/github_repos_list",
    getFiles: "https://flask-hello-world2-git-main-grandcanyonsmith.vercel.app/github_repos/",
    update: "https://flask-hello-world2-three.vercel.app/update",
    create: "https://flask-hello-world2-three.vercel.app/create_new_file"
  };
  
  const saveBtn = document.getElementById('saveBtn');
  saveBtn.addEventListener('click', async function() {
    try {
      await CodeSaver.saveCodeFile();
    } catch (error) {
      console.error('Error occurred while saving file:', error);
    }
  });

  let elements = {};
  let activeTab = null;
  
  class UI {
    static switchView(targetId) {
      const isSourceView = targetId === "sourceBtn";
      elements.codeBox.classList.toggle("hidden", !isSourceView);
      elements.outputBox.classList.toggle("hidden", isSourceView);
  
      if (!isSourceView) {
        this.displayOutput(
          elements.fileDropdown.value,
          elements.codeBox.textContent,
          elements.outputBox
        );
        Prism.highlightAll();
      }
    }
    static toggleView(targetId) {
      if (targetId === "sourceBtn") {
        UI.switchToSourceView();
      } else {
        UI.switchToOutputView();
      }
    }
  
    static switchToSourceView() {
      elements.codeBox.classList.remove("hidden");
      elements.outputBox.classList.add("hidden");
    }
  
    static switchToOutputView() {
      elements.codeBox.classList.add("hidden");
      elements.outputBox.classList.remove("hidden");
      UI.displayOutput(
        elements.fileDropdown.value,
        elements.codeBox.textContent,
        elements.outputBox
      );
      Prism.highlightAll();
    }
  
    static displayOutput(selectedFileUrl, codeBoxContent, outputBoxElement) {
      outputBoxElement.innerHTML = "";
      outputBoxElement.style.overflow = "auto";
  
      if (selectedFileUrl.endsWith(".html")) {
        UI.displayHtmlOutput(codeBoxContent, outputBoxElement);
      } else {
        UI.displayNonHtmlOutput(codeBoxContent, outputBoxElement);
      }
    }
  
    static displayHtmlOutput(htmlCode, outputBoxElement) {
      const iframe = document.createElement("iframe");
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "0";
      outputBoxElement.appendChild(iframe);
  
      const injectedCode = UI.injectCode(htmlCode);
      const iframeDoc = iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(injectedCode);
      iframeDoc.close();
    }
  
    static displayNonHtmlOutput(codeBoxContent, outputBoxElement) {
      outputBoxElement.textContent = codeBoxContent;
    }
  
    static injectCode(htmlCode) {
      const tabs = Array.from(document.querySelectorAll(".tab"));
      let code = {
        css: "",
        js: "",
        json: []
      };
  
      tabs.forEach((tab) => {
        const fileType = UI.getFileType(tab.querySelector("span").textContent);
        code[fileType] += tab.dataset.content || tab.dataset.content.push(fileType);
      });
  
      return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${code.css}</style>
            ${code.json
              .map((fileName) => `<script src="${fileName}"></script>`)
              .join("\n")}
        </head>
        <body>
            ${htmlCode}
            <script>${code.js}</script>
        </body>
        </html>
      `;
    }
  
    static getFileType(fileName) {
      if (fileName.endsWith(".css")) return "css";
      if (fileName.endsWith(".js")) return "js";
      if (fileName.endsWith(".json")) return "json";
    }
  
    static updateUIBeforeExecution() {
      elements.runBtn.textContent = "Running...";
    }
  
    static updateUIAfterExecution() {
      elements.runBtn.textContent = "Run";
      elements.loader.classList.add("hidden");
    }
  
    static updateUIBeforeSubmission() {
      elements.submitBtn.textContent = "Loading...";
    }
  
    static updateUIAfterSubmission() {
  elements.submitBtn.innerHTML = '<i data-feather="send" class="h-4 w-4"></i>';
  feather.replace(); // Update the icons
  elements.loader.classList.add("hidden");
}
   
  
    static updateUIAfterResponse(updatedTab) {
      $(updatedTab).click();
      UI.toggleView("outputBtn");
    }
  }
  
  class CodeRunner {
    static async executeCode() {
      try {
        UI.updateUIBeforeExecution();
        const data = await CodeRunner.runCode();
        UI.displayOutputData(data);
      } catch (error) {
        console.error(error);
      } finally {
        UI.updateUIAfterExecution();
      }
    }
  
    static async runCode() {
      const response = await axios.post(URLS.runCode, {
        code: elements.codeBox.textContent
      });
      return response.data;
    }
  
    static displayOutputData(data) {
      elements.outputBox.textContent = data;
      UI.toggleView("outputBtn");
    }
  }
  
  class CodeSubmitter {
    static async submitCodeRequest() {
      UI.updateUIBeforeSubmission();
      try {
        const payload = CodeSubmitter.preparePayload();
        const data = await CodeSubmitter.submitRequest(payload);
        CodeSubmitter.handleResponse(data);
      } catch (error) {
        console.error("Error:", error.message);
        console.error("Stack:", error.stack);
      } finally {
        UI.updateUIAfterSubmission();
      }
    }

    static getSelectedOptionText(dropdown) {
        return dropdown.options[dropdown.selectedIndex].text;
      }
  
    static preparePayload() {
      return {
        code: elements.codeBox.textContent,
        request: elements.requestInput.value,
        fileName: CodeSubmitter.getSelectedOptionText(elements.fileDropdown),
        repoName: CodeSubmitter.getSelectedOptionText(elements.repoDropdown)
      };
    }
  
    static async submitRequest(payload) {
      const response = await axios.post(URLS.submitRequest, payload);
      return response.data;
    }
  
    static handleResponse(response) {
        const updatedTabs = response.map(CodeSubmitter.handleFile);
        const updatedTab = updatedTabs[updatedTabs.length - 1];
        UI.updateUIAfterResponse(updatedTab);
        // Remove the following line
        // CodeSubmitter.getFileContent(elements.fileDropdown.value);
        elements.saveBtn.classList.remove("hidden");
        UI.toggleView("outputBtn"); // Add this line
      }
  
    static handleFile(file) {
      let tab = CodeSubmitter.findTab(file.fileName);
      if (!tab) {
        tab = CodeSubmitter.createTab(file);
        document.getElementById("tabs").appendChild(tab);
      }
      tab.dataset.content = file.fileContents;
      return tab;
    }
  
    static findTab(fileName) {
      const tabs = Array.from(document.querySelectorAll(".tab"));
      return tabs.find((tab) => tab.querySelector("span").textContent === fileName);
    }
  
    static createTab(file) {
      const tab = document.createElement("div");
      tab.className = `tab px-4 py-2 mr-2 bg-gray-200 hover:bg-gray-300 rounded-t-lg flex items-center justify-between ${
        file.newFile ? "border-b-2 border-green-400" : ""
      }`;
      tab.dataset.content = file.fileContents;
      tab.setAttribute("newFile", file.newFile ? "true" : "false");
  
      const span = document.createElement("span");
      span.className = "text-sm";
      span.textContent = file.fileName;
      tab.appendChild(span);
  
      const icon = document.createElement("i");
      icon.dataset.feather = "x-circle";
      icon.className = "ml-2 hover:bg-gray-400 rounded-full p-1 cursor-pointer";
      icon.addEventListener("click", (e) => {
        e.stopPropagation();
        tab.remove();
      });
      tab.appendChild(icon);
  
      feather.replace();
  
      tab.addEventListener("click", () => {
        elements.codeBox.textContent = tab.dataset.content;
        $(".tab").removeClass("bg-gray-300");
        tab.classList.add("bg-gray-300");
        activeTab = tab;
      });
  
      return tab;
    }
  
    static async getFileContent(fileUrl) {
        const response = await axios.get(fileUrl);
        const fileExtension = fileUrl.split(".").pop();
        let language;
        switch (fileExtension) {
          case "html":
            language = "markup";
            break;
          case "js":
            language = "javascript";
            break;
          case "css":
            language = "css";
            break;
          case "py":
            language = "python";
            break;
          default:
            language = "markup";
        }
        // Add the language class without removing existing classes
        elements.codeBox.className = "language-" + language;
        elements.codeBox.textContent = response.data;
        Prism.highlightAll();
        UI.displayOutput(fileUrl, response.data, elements.outputBox); // Add this line
        UI.switchToOutputView();
    }
  }
  
  class CodeSaver {
    static getActiveTabData() {
        if (!activeTab) return null;
        return {
            fileName: CodeSaver.getTabFileName(activeTab),
            fileContents: CodeSaver.getTabFileContents(activeTab),
            isNewFile: CodeSaver.isTabNewFile(activeTab)
        };
    }

    static async saveCodeFile() {
        const activeTabData = CodeSaver.getActiveTabData();
        if (!activeTabData) return;
    
        const repoData = CodeSaver.getRepoData();
        const payload = CodeSaver.getPayload(
            activeTabData.fileName,
            activeTabData.fileContents,
            repoData.repoName,
            repoData.branchName
        );
    
        console.log('Save payload:', payload); // Add this line to log the payload
    
        let url;
        console.log(url,'url')
        if (activeTabData.isNewFile) {
            url = URLS.create;
        } else {
            url = URLS.update;
        }
    
        try {
            const { data } = await axios.post(url, payload);
            console.log("Response from server:", data);
        } catch (error) {
            console.error("Error occurred while saving file:", error);
            if (error.response?.status === 500) {
                alert("Server error. Please try again later.");
            }
        } finally {
            elements.saveBtn.classList.add("hidden");
        }
    }
  
    static getTabFileName(tab) {
      return tab.querySelector("span").textContent;
    }
  
    static getTabFileContents(tab) {
      return tab.dataset.content;
    }
  
    static isTabNewFile(tab) {
      return tab.getAttribute("newFile") === "true";
    }
  
    static getRepoData() {
      const fileUrlParts = elements.fileDropdown.value.split("/");
      const repoIndex = fileUrlParts.indexOf("grandcanyonsmith") + 1;
      const repoName = fileUrlParts[repoIndex];
      const branchName = fileUrlParts[repoIndex + 1];
  
      return { repoName, branchName };
    }
  
    static getPayload(fileName, fileContents, repoName, branchName) {
        fileName = fileName.replace('📄 ', '').trim(); // Add trim() to remove leading and trailing spaces
        return {
            repo_name: repoName,
            file_name: fileName,
            file_contents: fileContents,
            branch_name: branchName
        };
    }
  }
  
  class DropdownManager {
    static async updateFileDropdown() {
      await DropdownManager.populateFileDropdown(elements.repoDropdown.value);
      const tabs = document.getElementById("tabs");
      tabs.innerHTML = "";
    }
  
    static handleFileSelection() {
        CodeSubmitter.getFileContent(elements.fileDropdown.value);
        elements.runBtn.classList.toggle(
          "hidden",
          !elements.fileDropdown.value.endsWith(".py")
        );
        const tabs = document.getElementById("tabs");
        while (tabs.firstChild) {
          tabs.removeChild(tabs.firstChild);
        }
        UI.switchToOutputView();
      }
  
    static async populateRepoDropdown() {
      const { data } = await axios.get(URLS.getRepos);
      data.forEach((repo) => elements.repoDropdown.append(new Option(repo, repo)));
    }
  
    static async populateFileDropdown(repo) {
      const {
        data
      } = await axios.post(
        "https://flask-hello-world2-git-main-grandcanyonsmith.vercel.app/get_all_contents",
        { repo_name: repo }
      );
      elements.fileDropdown.innerHTML = "";
      elements.fileDropdown.append(new Option("Select a file", ""));
      DropdownManager.populateDropdownWithResponseData(data);
    }
  
    static populateDropdownWithResponseData(data, parentPath = "", depth = 0) {
      const indent = "\u00A0\u00A0".repeat(depth * 2);
      data.forEach((item) => {
        const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name;
        if (item.type === "file") {
          elements.fileDropdown.append(
            new Option(`${indent}📄 ${itemPath}`, item.download_url)
          );
        } else if (item.type === "dir") {
          elements.fileDropdown.append(new Option(`${indent}📁 ${itemPath}`, ""));
          DropdownManager.populateDropdownWithResponseData(item.contents, itemPath, depth + 1);
        }
      });
    }
  }
  
  class Main {
    static async init() {
      elements = Main.getElementsById(ELEMENT_IDS);
      Main.addEventListeners();
      await DropdownManager.populateRepoDropdown();
    }
  
    static getElementsById(ids) {
      return ids.reduce(
        (obj, id) => ({ ...obj, [id]: document.getElementById(id) }),
        {}
      );
    }
  
    static addEventListeners() {
      Main.addClickListenersToButtons();
      Main.addChangeListenersToDropdowns();
      feather.replace();
    }
  
    static addClickListenersToButtons() {
      const buttonActions = {
        sourceBtn: () => UI.toggleView("sourceBtn"),
        outputBtn: () => UI.toggleView("outputBtn"),
        submitBtn: CodeSubmitter.submitCodeRequest,
        saveBtn: CodeSaver.saveCodeFile,
        runBtn: CodeRunner.executeCode
      };
  
      Object.entries(buttonActions).forEach(([id, action]) => {
        elements[id].addEventListener("click", action);
      });
    }
  
    static addChangeListenersToDropdowns() {
      elements.repoDropdown.addEventListener("change", DropdownManager.updateFileDropdown);
      elements.fileDropdown.addEventListener("change", DropdownManager.handleFileSelection);
    }
  }
  
  window.onload = Main.init;

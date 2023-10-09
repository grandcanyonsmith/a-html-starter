const ELEMENT_IDS = [
    "sourceBtn",
    "outputBtn",
    "submitBtn",
    "saveBtn",
    "runBtn",
    "loader",
    "codeBox",
    "outputBox",
    "fileDropdown",
    "requestInput"
  ];
  
  const URLS = {
    runCode: "https://xhy5at2dbpxeys62rsx4f6lfay0yigqt.lambda-url.us-west-2.on.aws/",
    submitRequest: "https://uslbd6l6ssolgomdrcdhnqa5me0rnsee.lambda-url.us-west-2.on.aws/",
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

    static displayOutputData(data) {
      // Implement your logic to display the data here.
      // For example, you might want to set the text content of an output element:
      elements.outputBox.textContent = data;
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
        elements.runBtn.innerHTML = '<i data-feather="play"></i>';
        elements.loader.classList.add("hidden");
        feather.replace(); // This line is needed to render the new icon
    }
  
    static updateUIBeforeSubmission() {
      elements.submitBtn.textContent = "Loading...";
    }
  
     static updateUIAfterSubmission() {
        elements.submitBtn.innerHTML = '<i data-feather="send"></i>';
        elements.loader.classList.add("hidden");
        feather.replace(); // This line is needed to render the new icon
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
      
      let dataString = '';
      if (data) {
        const { output, error } = data;
        dataString = `Output:\n${output}\n\nError:\n${error}`;
        console.log(dataString,'dataString');
      }

      UI.switchToOutputView();
      UI.displayOutputData(dataString);
    } catch (error) {
      console.error(error);
    } finally {
      UI.updateUIAfterExecution();
    }
  }
  
    static async runCode() {
      let filePath = elements.fileDropdown.value; // Get the file path from the dropdown
      filePath = filePath.split('master/')[1]; // Get the part of the URL after "master/"
      console.log('File path:', filePath); // Log the file path
      const response = await axios.post(URLS.runCode, {
        code: elements.codeBox.textContent,
        filePath: filePath // Include the file path in the post request
      });
      console.log(response,'response')
      console.log(response.data,'response')
      return response.data;
    }
  
static displayOutputData(data) {
    // Parse the data
    const parsedData = JSON.parse(data);

    // Format the output and error messages
    const formattedOutput = parsedData.output ? parsedData.output.replace(/\\n/g, '\n') : 'No output';
    const formattedError = parsedData.error ? parsedData.error.replace(/\\n/g, '\n') : 'No error';
    console.log(formattedOutput,'formattedOutput')
    console.log(formattedError,'formattedError')

    // Display the formatted data
    elements.outputBox.textContent = `Output: ${formattedOutput}\nError: ${formattedError}`;
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
        repoName: "a-canyon-yb-tests"
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
        UI.switchToSourceView(); // Add this line
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
        UI.switchToSourceView(); // Switch to source view after displaying the file content
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
      const repoName = 'a-canyon-yb-tests'; // Always use 'a-canyon-yb-tests' as repo name
      const branchName = 'main'; // Assuming 'main' as the default branch
  
      return { repoName, branchName };
    }
  
    static getPayload(fileName, fileContents, repoName, branchName) {
        fileName = fileName.replace('📄 ', '').trim(); // Add trim() to remove leading and trailing spaces
        return {
            repo_name: 'a-canyon-yb-tests',
            file_name: fileName,
            file_contents: fileContents,
            branch_name: branchName
        };
    }
  }

  
  class DropdownManager {
    static async updateFileDropdown() {
      await DropdownManager.populateFileDropdown();
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
        UI.switchToSourceView(); // Switch to source view instead of output view
    }
    
    static async populateFileDropdown() {
      const {
        data
      } = await axios.post(
        "https://flask-hello-world2-git-main-grandcanyonsmith.vercel.app/get_all_contents",
        { repo_name: 'a-canyon-yb-tests' }
      );
      elements.fileDropdown.innerHTML = "";
      elements.fileDropdown.append(new Option("Select a file", ""));
      DropdownManager.populateDropdownWithResponseData(data);
    }
  
static populateDropdownWithResponseData(data, parentPath = "", depth = 0) {
    const indent = "\u00A0\u00A0".repeat(depth * 2);
    data.forEach((item) => {
      const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name;
      const displayName = itemPath.split('/').pop();
      if (item.type === "file") {
        elements.fileDropdown.append(
          new Option(`${indent}📄 ${displayName}`, item.download_url)
        );
      } else if (item.type === "dir") {
        elements.fileDropdown.append(new Option(`${indent}📁 ${displayName}`, ""));
        DropdownManager.populateDropdownWithResponseData(item.contents, itemPath, depth + 1);
      }
    });
  }
  }
  
class Main {
  static async init() {
    elements = Main.getElementsById(ELEMENT_IDS);
    Main.addEventListeners();
    await DropdownManager.updateFileDropdown(); // Add this line
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
      // elements.repoDropdown.addEventListener("change", DropdownManager.updateFileDropdown);
      elements.fileDropdown.addEventListener("change", DropdownManager.handleFileSelection);
    }
  }
  
  window.onload = Main.init;

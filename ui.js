export default class UI {
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
  
        static switchToOutputView(elements) {
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
      elements.submitBtn.textContent = "Submit";
      elements.loader.classList.add("hidden");
    }
  
    static updateUIAfterResponse(updatedTab) {
      $(updatedTab).click();
      UI.toggleView("outputBtn");
    }
  }


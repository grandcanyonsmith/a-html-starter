const toggleView = (targetId) => {
    const isSourceEvent = targetId === "sourceBtn";
    elements.codeBox.classList.toggle("hidden", !isSourceEvent);
    elements.outputBox.classList.toggle("hidden", isSourceEvent);
    if (!isSourceEvent) {
        displayOutput(elements.fileDropdown.value, elements.codeBox.textContent, elements.outputBox);
    }
    Prism.highlightAll();
};

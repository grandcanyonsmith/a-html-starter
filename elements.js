const elements = ["sourceBtn", "outputBtn", "submitBtn", "saveBtn", "runBtn", "loader", "codeBox", "outputBox", "repoDropdown", "fileDropdown", "requestInput"]
  .reduce((obj, id) => ({ ...obj, [id]: document.getElementById(id) }), {});

function populateDocumentationRequirements() {
    const data = {
        "documents": [
            {
                "documentName": "Project Overview",
                "description": "The project's objective is to develop a centralized platform for managing and executing tests for OC Tanner's Test suite. The vision is to provide a tool that enables managers to determine product readiness for shipping and allows test engineers to run and fix tests from a single location.",
                "author": "John Doe"
            },
            // More documents...
        ]
    };

    const container = document.getElementById('brd');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const headerRow = document.createElement('tr');

    ['Document Name', 'Description', 'Author'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    data.documents.forEach(document => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = document.documentName;
        row.appendChild(nameCell);

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = document.description;
        row.appendChild(descriptionCell);

        const authorCell = document.createElement('td');
        authorCell.textContent = document.author;
        row.appendChild(authorCell);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);
}
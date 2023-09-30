const data = {
    "documents": [
        {
            "documentName": "Business Requirements Document",
            "description": "The project's objective is to develop a centralized platform for managing and executing tests for OC Tanner's Test suite. The vision is to provide a tool that enables managers to determine product readiness for shipping and allows test engineers to run and fix tests from a single location.",
            "author": "Canyon Smith"
        },
        {
            "documentName": "Software Requirements Document",
            "description": "The primary goals are to provide real-time status of product readiness for shipping and to reduce the time taken to run and diagnose broken tests. The key stakeholders include Kevin, Matt, Canyon, Patrick, Arialle, Flor, Logan, and Jacob.",
            "author": "Canyon Smith"
        },
        // More documents...
    ]
};

function populateDocumentationRequirements() {
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

    data.documents.forEach(documentData => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = documentData.documentName;
        row.appendChild(nameCell);

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = documentData.description;
        row.appendChild(descriptionCell);

        const authorCell = document.createElement('td');
        authorCell.textContent = documentData.author;
        row.appendChild(authorCell);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);
}
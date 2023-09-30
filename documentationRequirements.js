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
    ]
};

function populateDocumentationRequirements() {
    let documentationRequirementsTable = `
        <table>
            <thead>
                <tr>
                    <th>Document Name</th>
                    <th>Description</th>
                    <th>Author</th>
                </tr>
            </thead>
            <tbody>
                ${data.documents.map(documentData => `
                    <tr>
                        <td>${documentData.documentName}</td>
                        <td>${documentData.description}</td>
                        <td>${documentData.author}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    document.getElementById('documentationRequirements').innerHTML = documentationRequirementsTable;
}

window.onload = populateDocumentationRequirements;
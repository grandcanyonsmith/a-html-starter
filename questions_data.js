const data = {
    "sections": [
        {
            "sectionName": "Project Overview",
            "description": "The project's objective is to develop a centralized platform for managing and executing tests for OC Tanner's Test suite. The vision is to provide a tool that enables managers to determine product readiness for shipping and allows test engineers to run and fix tests from a single location."
        },
        {
            "sectionName": "Business Objectives",
            "description": "The primary goals are to provide real-time status of product readiness for shipping and to reduce the time taken to run and diagnose broken tests. The key stakeholders include Kevin, Matt, Canyon, Patrick, Arialle, Flor, Logan, and Jacob."
        },
        // More sections here...
    ]
};

function insertData() {
    const container = document.getElementById('brd');

    data.sections.forEach(section => {
        const heading = document.createElement('h2');
        heading.textContent = section.sectionName;
        const paragraph = document.createElement('p');
        paragraph.textContent = section.description;
        container.appendChild(heading);
        container.appendChild(paragraph);

        if (section.sectionName === 'Functional Requirements' || section.sectionName === 'Non-Functional Requirements') {
            const table = document.createElement('table');
            table.className = 'table table-striped';
            const lines = section.description.split('. ');
            lines.forEach(line => {
                const row = document.createElement('tr');
                const parts = line.split(': ');
                const requirement = document.createElement('td');
                requirement.textContent = parts[0];
                const description = document.createElement('td');
                description.textContent = parts[1];
                row.appendChild(requirement);
                row.appendChild(description);
                table.appendChild(row);
            });
            container.appendChild(table);
        }
    });
}

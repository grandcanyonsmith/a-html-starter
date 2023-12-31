// datascript.js

// Define the data
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
        {
            "sectionName": "Project Scope",
            "description": "The project encompasses the development of a dashboard integrated with the Heimdall dashboard. This dashboard will facilitate test execution from the cloud in Python for Celebrations and legacy teams, provide real-time updates on executed tests, and enable direct test upload to TestRail."
        },
        {
            "sectionName": "Functional Requirements",
            "description": "Code Execution: The system must be able to execute code via the cloud by pressing a button. Code Viewing: The system must allow users to view the code for every test within the dashboard. Test Result Access: The system must provide access to all previous test results. Integration: The system must integrate with TestRail and OpenAI API. Speed: The system must ensure faster execution time than current tests written in Ruby."
        },
        {
            "sectionName": "Non-Functional Requirements",
            "description": "Performance: The system must ensure faster performance than Ruby tests. Responsiveness: The system must provide mobile responsiveness. Compatibility: The system must ensure compatibility with any device."
        },
        {
            "sectionName": "Technical Requirements",
            "description": "The project will leverage technologies such as AWS Lambda, AWS DynamoDB, AWS EC2, Terraform, and OpenAI."
        },
        {
            "sectionName": "User Requirements",
            "description": "The end-users, including the test engineering department, software developers, and tech management, require a tool that allows them to run and diagnose tests quickly and from anywhere."
        },
        {
            "sectionName": "Regulatory Requirements",
            "description": "The system must comply with SOC standards and be usable in any country. All user data sent to AI models must be PII redacted and encrypted."
        },
        {
            "sectionName": "Project Timeline",
            "description": "The project is slated to commence in mid-August, with the first phase expected to conclude by December 15th."
        },
        {
            "sectionName": "Budget",
            "description": "The budget for the project is yet to be determined."
        },
        {
            "sectionName": "Risk Management",
            "description": "Potential risks include lack of company-wide adoption to Python and working with AI. These risks will be mitigated through training on OpenAI API, AWS Lambda, and AWS EC2."
        },
        {
            "sectionName": "Success Criteria",
            "description": "Success will be gauged by improvements in average time spent to run code tests and other KPIs such as Test run setup time improvement %, Test responsibility diagnosis improvement time %, Test fix improvement time %, Test run waiting time % improvement, Average time savings per week per head, and Average annual labor savings."
        },
        {
            "sectionName": "Documentation",
            "description": "The project will require a Business requirements document, software design document, software specification document, the code for a dashboard built into Heimdall for viewing past test runs, a page in Heimdall dashboard for executing the tests on the cloud, and a page for diagnosing broken tests and fixing them, a AWS Typescript Cloudformation template for all resources used. Canyon Smith will maintain these documents."
        },
        {
            "sectionName": "Change Management",
            "description": "Changes to the project requirements will be managed by updating the confluence document for the project, updating the timelines, and notifying changes to people in teams or slack who are working on the project. Arialle will be responsible for managing these changes."
        }
    ]
};

// Function to populate data
function populateData() {
    // Get the container to insert the sections into
    const container = document.getElementById('brd');
    // Loop through each section in the data
    data.sections.forEach(section => {
        // Create a new heading and paragraph for the section
        const heading = document.createElement('h2');
        heading.textContent = section.sectionName;
        const paragraph = document.createElement('p');
        paragraph.textContent = section.description;
        // Append the heading and paragraph to the container
        container.appendChild(heading);
        container.appendChild(paragraph);
        // If the section is Functional or Non-Functional Requirements, create a table
        if (section.sectionName === 'Functional Requirements' || section.sectionName === 'Non-Functional Requirements') {
            const table = document.createElement('table');
            table.className = 'table table-striped';
            // Split the description into lines
            const lines = section.description.split('. ');
            // Loop through each line and create a row in the table
            lines.forEach(line => {
                const row = document.createElement('tr');
                // Split the line into the requirement and the description
                const parts = line.split(': ');
                const requirement = document.createElement('td');
                requirement.textContent = parts[0];
                const description = document.createElement('td');
                description.textContent = parts[1];
                // Append the requirement and description to the row
                row.appendChild(requirement);
                row.appendChild(description);
                // Append the row to the table
                table.appendChild(row);
            });
            // Append the table to the container
            container.appendChild(table);
        }
    });
}
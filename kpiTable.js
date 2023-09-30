function populateKPITable() {
    // data can be fetched from an API, the current data is for demonstration
    const data = [
        {
            testMetric: "Setup <i class='fas fa-clock'></i>",
            description: "Time to prepare and initiate a test run",
            current: "30 min",
            goal: "3 min",
            percentageChange: "90% <i class='fas fa-arrow-down red-arrow'></i> Reduction"
        },
        {
            testMetric: "Responsibility Diagnosis <i class='fas fa-clock'></i>",
            description: "Time to determine cause of broken test and assign responsibility",
            current: "15 min",
            goal: "3 min",
            percentageChange: "80% <i class='fas fa-arrow-down red-arrow'></i> Reduction"
        },
        {
            testMetric: "Running Tests <i class='fas fa-clock'></i>",
            description: "Time to run an entire test suite",
            current: "1 hour",
            goal: "20 min",
            percentageChange: "67% <i class='fas fa-arrow-down red-arrow'></i> Reduction"
        },
        {
            testMetric: "Fix Bugs <i class='fas fa-clock'></i>",
            description: "Time to fix a broken test",
            current: "30 min - 1 hour",
            goal: "3-5 min",
            percentageChange: "90% <i class='fas fa-arrow-down red-arrow'></i> Reduction"
        }
    ];
    
    let tableBody = document.querySelector("#kpiTable tbody");
    data.forEach(item => {
        let row = document.createElement("tr");
        Object.values(item).forEach(text => {
            let cell = document.createElement("td");
            cell.innerHTML = text;
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });
}

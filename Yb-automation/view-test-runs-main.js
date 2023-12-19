
let allTestData = []; // This will store all the test data after the initial fetch

document.addEventListener('DOMContentLoaded', function() {
    // Fetch the test data when the DOM content is loaded
renderTestDataCards({}, true);
    fetchData('today');
// Call this function when the page is initially loaded to show the spinner


    // Set up filter toggle event listeners
    var filterToggles = document.querySelectorAll('.filter-toggle-button');
    filterToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            var targetId = this.getAttribute('aria-controls');
            var targetElement = document.getElementById(targetId);
            var isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!isExpanded));
            targetElement.classList.toggle('hidden');
        });
    });
    // Utility function to create DOM elements
    function createElement(tag, className, content) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (content) element.textContent = content;
        return element;
    }

    // Helper function to get status color
    function getStatusColor(status) {
        const statusColors = {
            'Passed': 'bg-green-600',
            'Failed': 'bg-red-600',
            'Untested': 'bg-yellow-600'
        };
        return statusColors[status] || 'bg-gray-600';
    }

// Function to render test data cards
// Function to render test data cards
// Function to render test data cards
// Function to render test data cards
// Function to render test data cards
function renderTestDataCards(groupedTests, isLoading) {
    const container = document.getElementById('test-data');
    container.innerHTML = ''; // Clear existing content

    // Define all possible statuses
    const allStatuses = ['Passed', 'Failed', 'Untested'];

    // Render a card for each status
    allStatuses.forEach(status => {
        const card = createElement('div', 'bg-gray-900 p-4 rounded-lg shadow-lg');
        const title = createElement('p', 'text-sm font-medium text-gray-400', status);
        card.appendChild(title);

        if (isLoading) {
            // Add spinner, aligned to the left
            const spinnerWrapper = createElement('div', 'flex items-center');
            const spinner = createElement('div', 'spinner mr-2');
            spinnerWrapper.appendChild(spinner);
            card.appendChild(spinnerWrapper);
        } else {
            // Show actual count or 0 if undefined or empty, aligned to the left
            const countValue = (groupedTests[status] && groupedTests[status].length) ? groupedTests[status].length : 0;
            const count = createElement('p', 'mt-2 text-4xl font-semibold text-white', countValue.toString());
            card.appendChild(count);
        }

        container.appendChild(card);
    });

    // Calculate and add total card
    const totalCard = createElement('div', 'bg-gray-900 p-4 rounded-lg shadow-lg');
    const totalTitle = createElement('p', 'text-sm font-medium text-gray-400', 'Total');
    totalCard.appendChild(totalTitle);

    if (isLoading) {
        // Add spinner to total card, aligned to the left
        const spinnerWrapper = createElement('div', 'flex items-center');
        const spinner = createElement('div', 'spinner mr-2');
        spinnerWrapper.appendChild(spinner);
        totalCard.appendChild(spinnerWrapper);
    } else {
        // Show total count or 0 if no data, aligned to the left
        const total = allStatuses.reduce((sum, status) => {
            return sum + (groupedTests[status] ? groupedTests[status].length : 0);
        }, 0);
        const totalCount = createElement('p', 'mt-2 text-4xl font-semibold text-white', total.toString());
        totalCard.appendChild(totalCount);
    }

    container.appendChild(totalCard);
}




function renderTestDataTable(filteredData) {
            const tbody = document.getElementById('table-body');
            tbody.innerHTML = ''; // Clear existing content

            Object.values(filteredData).flat().forEach(data => {
                const tr = createElement('tr');
                const checkboxCell = createElement('td', 'px-6 py-4');
                const checkbox = createElement('input', 'row-checkbox rounded border-gray-300 text-indigo-600 focus:ring-indigo-600');
                checkbox.type = 'checkbox';
                checkbox.setAttribute('data-file-path', data.filePath);
                checkboxCell.appendChild(checkbox);

        const testNameCell = createElement('td', 'px-6 py-4 text-sm text-gray-300');
        const testNameLink = createElement('a', 'tooltip', data.formattedTestName);
testNameLink.href = `run-details.html?testName=${encodeURI(data.testName)}&id=${encodeURIComponent(data.runId || null)}`;
// Removed the following two lines to open links in the same tab
// testNameLink.setAttribute('target', '_blank'); // Open in new tab
// testNameLink.setAttribute('rel', 'noopener noreferrer'); // Mitigate potential security risks
const tooltipText = createElement('span', 'tooltiptext', data.testName);
testNameLink.appendChild(tooltipText);
testNameCell.appendChild(testNameLink);

                // Team and test type labels with additional spacing
                const labelsDiv = createElement('div', 'mt-2');
                const teamLabel = createElement('div', 'inline-flex items-center rounded-md px-1 py-0.5 text-xs font-medium ring-1 ring-inset bg-blue-50 text-blue-700 ring-blue-600 mr-2', data.team);
                const testTypeLabel = createElement('div', 'inline-flex items-center rounded-md px-1 py-0.5 text-xs font-medium ring-1 ring-inset bg-purple-50 text-purple-700 ring-purple-600', data.testType);
                labelsDiv.appendChild(teamLabel);
                labelsDiv.appendChild(testTypeLabel);
                testNameCell.appendChild(labelsDiv);

                const statusCell = createElement('td', 'px-6 py-4 text-sm');
                const statusDiv = createElement('div', 'flex items-center');
                const statusIndicator = createElement('div', `h-2.5 w-2.5 rounded-full ${getStatusColor(data.status)}`);
                statusDiv.appendChild(statusIndicator);
                const statusText = createElement('span', 'ml-2 text-white', data.status);
                statusDiv.appendChild(statusText);
                statusCell.appendChild(statusDiv);

                const lastRunCell = createElement('td', 'px-6 py-4 text-sm text-gray-400');
                const lastRunTime = createElement('time', '', data.timeframe);
                lastRunTime.setAttribute('datetime', data.timeframe);
                lastRunCell.appendChild(lastRunTime);

                tr.appendChild(checkboxCell);
                tr.appendChild(testNameCell);
                tr.appendChild(statusCell);
                tr.appendChild(lastRunCell);

                tbody.appendChild(tr);
            });
        }

document.querySelectorAll('.filter-toggle-button').forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('aria-controls');
        const targetElement = document.getElementById(targetId);
        const isExpanded = this.getAttribute('aria-expanded') === 'true';

        this.setAttribute('aria-expanded', !isExpanded);
        targetElement.classList.toggle('hidden');
    });
});

// Function to check all checkboxes
function checkAllCheckboxes() {
    const checkboxes = document.querySelectorAll('.row-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
    // Update the state of the "Select All" checkbox
    const selectAllCheckbox = document.getElementById('select-all');
    if (selectAllCheckbox) {
        selectAllCheckbox.checked = true;
    }
    // Optionally, trigger any other actions that depend on checkboxes being checked
    toggleRunTestsButton(true);
}

function toggleRunTestsButton(show) {
    const runTestsContainer = document.getElementById('run-tests-container');
    if (show) {
        runTestsContainer.classList.remove('hidden');
        document.getElementById('run-tests-btn').addEventListener('click', runSelectedTests);
    } else {
        runTestsContainer.classList.add('hidden');
    }
}

    // Fetch and render test data
// Fetch and render test data
    function fetchData(timeframe, callback) {
        console.log('fetchData called with timeframe:', timeframe);
    axios.post('https://4ktivmmitgsrs67idemrarllyy0ltvat.lambda-url.us-west-2.on.aws/', { timestamp: timeframe })
        .then(response => {
            console.log('Response data:', response.data);
            if (response.data && typeof response.data === 'object') {
                // Combine all tests from each status into a single array
                allTestData = [].concat(
                    response.data.Passed,
                    response.data.Failed,
                    response.data.Untested
                );
                console.log('Data fetched:', allTestData);
                applyFilters(); // Call applyFilters here to ensure it's called after data is fetched
            } else {
                console.error('Expected an object with test status arrays, but got:', response.data);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Group the test data by status
function groupByStatus(tests) {
console.log(tests,'tests');
    return tests.reduce((acc, test) => {
        const { status } = test;
        if (!acc[status]) {
            acc[status] = [];
        }
        acc[status].push(test);
        return acc;
    }, {});
}



function applyFilters() {
    console.log('Applying filters...');

    const selectedTeams = Array.from(document.querySelectorAll('input[name="team[]"]:checked')).map(input => input.value);
    const selectedTestTypes = Array.from(document.querySelectorAll('input[name="test-type[]"]:checked')).map(input => input.value);
    const selectedStatuses = Array.from(document.querySelectorAll('input[name="status[]"]:checked')).map(input => input.value);

    console.log('Selected Teams:', selectedTeams);
    console.log('Selected Test Types:', selectedTestTypes);
    console.log('Selected Statuses:', selectedStatuses);

    const filteredData = allTestData.filter(data => {
        const teamMatch = selectedTeams.length === 0 || selectedTeams.includes(data.team);
        const testTypeMatch = selectedTestTypes.length === 0 || selectedTestTypes.includes(data.testType);
        const statusMatch = selectedStatuses.length === 0 || selectedStatuses.includes(data.status);
        const isMatch = teamMatch && testTypeMatch && statusMatch;
        if (isMatch) {
            console.log('Matching item:', data);
        }
        return isMatch;
    });

    console.log('allTestData at filter time:', allTestData);
    console.log('Filtered Data:', filteredData);

    // Group the filtered data by status
    const groupedData = groupByStatus(filteredData);

    // Now call the functions to update the UI with the filtered data
    renderTestDataCards(groupedData); // Pass the grouped data here
    renderTestDataTable(filteredData);
    checkAllCheckboxes();
}


// Event listener for filter changes
document.querySelectorAll('input[name="team[]"], input[name="test-type[]"], input[name="status[]"]').forEach(input => {
    input.addEventListener('change', applyFilters); // Apply filters to the stored data
});
    // Function to toggle the Run Tests button
// Function to toggle the Run Tests button
function toggleRunTestsButton(show) {
    const runTestsContainer = document.getElementById('run-tests-container');
    if (show) {
        runTestsContainer.classList.remove('hidden');
        document.getElementById('run-tests-btn').addEventListener('click', runSelectedTests);
    } else {
        runTestsContainer.classList.add('hidden');
    }
}

    // Function to run selected tests
    function runSelectedTests() {
        const checkboxes = document.querySelectorAll('.row-checkbox:checked');
        const filePaths = Array.from(checkboxes).map(checkbox => checkbox.getAttribute('data-file-path'));
    // Add event listener for the Run Tests button
    const runTestsBtn = document.getElementById('run-tests-btn');
    if (runTestsBtn) {
        runTestsBtn.addEventListener('click', runSelectedTests);
    }

        runTestsBtn.textContent = 'Running...';

        const testPromises = filePaths.map(filePath => {
            return axios.post('https://xmichysgq4emm6orafcdnwwhwu0lvmez.lambda-url.us-west-2.on.aws/', { filePath: filePath });
        });

        Promise.all(testPromises)
            .then(responses => {
                alert('All tests run successfully.');
                runTestsBtn.textContent = 'Run Tests';
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });
                toggleRunTestsButton(false);
                const selectAllCheckbox = document.getElementById('select-all');
                selectAllCheckbox.checked = false;
            })
            .catch(error => {
                console.error(error);
                runTestsBtn.textContent = 'Run Tests';
                alert('An error occurred while running the tests.');
            });
    }

    // Event listeners setup
    function setupEventListeners() {

        const selectAllCheckbox = document.getElementById('select-all');
        selectAllCheckbox.addEventListener('change', event => {
            const checkboxes = document.querySelectorAll('.row-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = event.target.checked;
            });
            toggleRunTestsButton(event.target.checked);
        });

        document.addEventListener('change', event => {
            if (event.target.classList.contains('row-checkbox')) {
                const checkboxes = document.querySelectorAll('.row-checkbox');
                const anyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
                toggleRunTestsButton(anyChecked);
                const selectAllCheckbox = document.getElementById('select-all');
                selectAllCheckbox.checked = Array.from(checkboxes).every(checkbox => checkbox.checked);
            }
        });

document.querySelectorAll('input[name="team[]"], input[name="test-type[]"], input[name="status[]"]').forEach(input => {
    input.addEventListener('change', () => {
        applyFilters(allTestData); // Apply filters to the stored data
    });
});
    }

function setupFilterDropdowns() {
    var filterToggles = document.querySelectorAll('.filter-toggle-button, .desktop-filter-toggle-button');

    filterToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(event) {
            // Use currentTarget to always get the button, not the clicked child element
            var button = event.currentTarget;
            var targetId = button.getAttribute('aria-controls');
            var targetElement = document.getElementById(targetId);
            if (!targetElement) {
                console.error('No target element found with ID:', targetId);
                return;
            }

            var isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', String(!isExpanded));
            targetElement.classList.toggle('hidden');
            var svg = button.querySelector('svg');
            if (svg) {
                svg.classList.toggle('rotate-180');
            }
        });
    });
}

// Call setupFilterDropdowns on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    setupFilterDropdowns();
});



// Add event listeners for the new Timeframe dropdown links
document.querySelectorAll('#desktop-filter-timeframe a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const timeframe = this.getAttribute('data-timeframe');
        fetchData(timeframe, applyFilters);
        // Close the dropdown after selection
        document.getElementById('desktop-filter-timeframe').classList.add('hidden');
    });
});

// Remove the event listener for the removed Select Timeframe dropdown
// timeframeDropdown.removeEventListener('change', ...);

document.addEventListener('DOMContentLoaded', function() {
    setupFilterDropdowns();
});

document.addEventListener('click', function(event) {
    console.log('Document click event:', event.target);
});

    // Mobile filter button event listener
    const mobileFilterButton = document.getElementById('mobile-filter-button');
    const mobileFilters = document.getElementById('mobile-filters');
    const mobileFiltersCloseButton = document.getElementById('mobile-filters-close');

    if (mobileFilterButton && mobileFilters) {
        mobileFilterButton.addEventListener('click', function() {
            mobileFilters.classList.toggle('hidden');
        });
    } else {
        console.error('Mobile filters button or mobile filters div not found');
    }

    mobileFiltersCloseButton.addEventListener('click', function() {
        mobileFilters.classList.add('hidden');
    });

    // Setup event listeners for mobile filter checkboxes
    document.querySelectorAll('#mobile-filters input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // Call applyFilters when a checkbox changes
            const timeframe = document.getElementById('timeframe').value;
            fetchData(timeframe, applyFilters);
        });
    });


    // Close filters on outside click
    function setupCloseFiltersOnClickOutside() {
        document.addEventListener('click', function(event) {
            var filterToggles = document.querySelectorAll('.filter-toggle-button');
            filterToggles.forEach(function(toggle) {
                var targetId = toggle.getAttribute('aria-controls');
                var targetElement = document.getElementById(targetId);
                if (!event.target.closest('.filter-toggle-button') && !targetElement.contains(event.target)) {
                    toggle.setAttribute('aria-expanded', 'false');
                    targetElement.classList.add('hidden');
                    toggle.querySelector('svg').classList.remove('rotate-180');
                }
            });
        });
    }

// Initialize the app with filters and dropdowns
// Initialize the app with filters and dropdowns
function init() {
    setupEventListeners();

    setupFilterDropdowns();
    setupCloseFiltersOnClickOutside();
}


    init();
});

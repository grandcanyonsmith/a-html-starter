document.addEventListener('DOMContentLoaded', populateSuccessCriteria);

function populateSuccessCriteria() {
    let successCriteriaTable = `
        <h2>Success Criteria</h2>
        <div class="scrollable-table">
            <table>
                <thead>
                    <tr>
                        <th>Test Metric</th>
                        <th>Description</th>
                        <th>Current</th>
                        <th>Goal</th>
                        <th>% Change</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Setup time <i class="fas fa-clock"></i></td>
                        <td>Time to prepare and initiate a test run</td>
                        <td>30 min</td>
                        <td>3 min</td>
                        <td>90% <i class="fas fa-arrow-down red-arrow"></i> Reduction</td>
                    </tr>
                    <tr>
                        <td>Responsibility Diagnosis <i class="fas fa-clock"></i></td>
                        <td>Time to determine cause of broken test and assign responsibility</td>
                        <td>15 min</td>
                        <td>3 min</td>
                        <td>80% <i class="fas fa-arrow-down red-arrow"></i> Reduction</td>
                    </tr>
                    <tr>
                        <td>Running Tests <i class="fas fa-clock"></i></td>
                        <td>Time to run an entire test suite</td>
                        <td>1 hour</td>
                        <td>20 min</td>
                        <td>67% <i class="fas fa-arrow-down red-arrow"></i> Reduction</td>
                    </tr>
                    <tr>
                        <td>Fix Bugs <i class="fas fa-clock"></i></td>
                        <td>Time to fix a broken test</td>
                        <td>30 min - 1 hour</td>
                        <td>3-5 min</td>
                        <td>90% <i class="fas fa-arrow-down red-arrow"></i> Reduction</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    document.getElementById('successCriteria').innerHTML = successCriteriaTable;
}
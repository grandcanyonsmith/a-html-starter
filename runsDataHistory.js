$(document).ready(function() {
(function() {
  const API_URL =
    "https://plkvn6skvpjk3cinv3q5jmjyiy0ebrza.lambda-url.us-west-2.on.aws/";
  const elements = {
    timeframe: $("#timeframe"),
    team: $("#team"),
    pastRunsBody: $("#pastRunsBody"),
    pastRunsTitle: $("#pastRunsTitle")
  };

  let testRunsChart; // This variable will hold the chart instance

  const updateTitle = () => {
    const title = `${elements.team.val()} ${$(
      "#testing_type"
    ).val()} over the Last ${elements.timeframe.val()} Day(s)`;
    elements.pastRunsTitle.text(title);
  };

  const updateAggregateValues = () => {
    let totalTests = 0,
      totalPassed = 0,
      totalFailed = 0,
      totalRuns = 0;
    elements.pastRunsBody.find("tr").each(function() {
      const cells = $(this).find("td");
      totalTests += parseInt(cells.eq(3).text()) || 0;
      totalPassed += parseInt(cells.eq(4).text()) || 0;
      totalFailed += parseInt(cells.eq(5).text()) || 0;
      totalRuns++;
    });
    $("#totalTests").text(totalTests);
    $("#totalPassed").text(totalPassed);
    $("#totalFailed").text(totalFailed);
    $("#totalRuns").text(totalRuns);
  };

  const fetchTestRuns = async () => {
    const timeframe = parseInt(elements.timeframe.val());
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - timeframe);
    const team = elements.team.val();
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          start_date: startDate.toISOString().split("T")[0],
          end_date: endDate.toISOString().split("T")[0],
          team: team
        })
      });
      const data = await response.json();
      handleTestRunsResponse(data);
      generateGraph(data); // Generate the graph with the fetched data
    } catch (error) {
      handleError(error);
    }
  };

const handleTestRunsResponse = (response) => {
  elements.pastRunsBody.empty();
  response.forEach((testRun, index) => {
    const statusIcon =
      testRun.Status === "Passed" ?
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-green-500 mr-2" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>' :
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill text-red-500 mr-2" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>';
    const row = $(`<tr>
            <td class="p-2 border border-gray-800 text-gray-300">
                <div class="text-white">${testRun.Date.split(" ")[0].substring(5)}</div>
                <div class="text-gray-400 text-xs">${
                  testRun.Date.split(" ")[1].substring(0, 5)
                }</div>
            </td>
            <td class="p-2 border border-gray-800 test-id hover:bg-gray-700 cursor-pointer">
                <a href="#" class="text-white no-underline">${
                  testRun.TestID
                }</a>
            </td>
            <td class="p-2 border border-gray-800 status flex justify-center items-center">${statusIcon}</td>
            <td class="p-2 border border-gray-800 text-gray-300">${
              testRun.Duration ? testRun.Duration : '-'
            }</td>
            <td class="p-2 border border-gray-800 text-gray-300">${
              testRun.Tests
            }</td>
            <td class="p-2 border border-gray-800 text-gray-300">${
              testRun.Passed
            }</td>
            <td class="p-2 border border-gray-800 text-gray-300">${
              testRun.Failed
            }</td>
        </tr>`);
    row.find('.test-id a').on('click', function(e) {
      e.preventDefault();
      window.location.href = `testData.html?testID=${testRun.TestID}`; // Replace 'testData.html' with the actual page URL
    });
    elements.pastRunsBody.append(row);
  });
  updateAggregateValues();
};

  const generateGraph = (testRuns) => {
    const labels = testRuns.map(run => run.Date.split(" ")[0].substring(5)); //remove the year with substring the first 5 characters
    const passedData = testRuns.map(run => run.Passed);
    const failedData = testRuns.map(run => run.Failed);
    console.log(passedData,'passedData')
    console.log(failedData,'failedData')
    console.log(labels,'labels')
    if (testRunsChart) {
      testRunsChart.destroy(); // If the chart was already created, destroy it before creating a new one
    }

testRunsChart = new Chart(document.getElementById('testRunsChart').getContext('2d'), {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Passed',
      data: passedData,
      fill: true,
      backgroundColor: 'rgba(75, 192, 192, 0.2)', // Lighter fill color
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2, // Thicker line
      pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Point color same as line color
      pointBorderColor: '#fff', // White border for points
      pointHoverBackgroundColor: '#fff', // White fill for points on hover
      pointHoverBorderColor: 'rgba(75, 192, 192, 1)' // Line color border for points on hover
    },
    {
      label: 'Failed',
      data: failedData,
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)', // Lighter fill color
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2, // Thicker line
      pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Point color same as line color
      pointBorderColor: '#fff', // White border for points
      pointHoverBackgroundColor: '#fff', // White fill for points on hover
      pointHoverBorderColor: 'rgba(255, 99, 132, 1)' // Line color border for points on hover
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to resize based on container's dimensions
    scales: {
      y: {
        beginAtZero: true,
        gridLines: {
          color: 'rgba(255, 255, 255, 0.1)' // Lighter grid lines
        }
      },
      x: {
        gridLines: {
          color: 'rgba(255, 255, 255, 0.1)' // Lighter grid lines
        }
      }
    },
    elements: {
      line: {
        tension: 0.4 // This makes the lines curved
      },
      point: {
        radius: 5, // Bigger points
        hoverRadius: 7 // Bigger points on hover
      }
    }
  }
});
  };

  const handleError = (error) => {
    console.log("error", error);
  };

  elements.timeframe.on("change", function() {
    updateTitle();
    fetchTestRuns();
    updateAggregateValues();
  });

  elements.team.on("change", function() {
    updateTitle();
    fetchTestRuns();
    updateAggregateValues();
  });

  updateTitle();
  fetchTestRuns();
})();
});

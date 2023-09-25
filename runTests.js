$(document).ready(function() {
  (function() {
  const TEST_API_URL =
    "https://caudrbbckdes2nheqylqmyiery0oykzh.lambda-url.us-west-2.on.aws/";
  const elements = {
    runTestsBtn: $("#runTestsBtn"),
    testResult: $("#testResult"),
    team: $("#team")
  };

  const handleTestResult = (data) => {
    console.log("Data:", data);
    let html = "";
    data.tests.forEach((test, index) => {
      const statusIcon =
        test.status === "passed" ?
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill stylish-svg-pass text-green-500 mr-2" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>' :
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill text-red-500 mr-2" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>';
      const statusClass =
        test.status === "passed" ? "text-green-500" : "text-red-500";
      const zebraClass = index % 2 === 0 ? "bg-gray-800" : "bg-gray-800";
      html += `<div class="stylish-p dark-theme ${zebraClass}"><div class="flex justify-between items-center w-full">${statusIcon} <a href="https://html-starter-coral.vercel.app/testCode.html?fileName=${test.name}" class="file-link">${test.name}</a> <span class="${statusClass}">${test.status}</span></div></div>`;
    });
    html += `<p class="stylish-p dark-theme"><div class="flex justify-between items-center w-full">Total Tests:<span>${data.total_tests}</span></div></p>`;
    html += `<p class="stylish-p dark-theme"><div class="flex justify-between items-center w-full">Total Time:<span>${data.total_time}</span></div></p>`;
    html +=
      '<button id="uploadToTestrailBtn" class="px-4 py-2 bg-green-500 text-white rounded shadow mb-5 text-sm">Upload to Testrail</button>';
    elements.testResult.html(html);
    $('.file-link').hover(function() {
      $(this).css('text-decoration', 'underline');
    }, function() {
      $(this).css('text-decoration', 'none');
    });
  };

  const showLoadingAnimation = () => {
    elements.runTestsBtn.prop("disabled", true).text("Loading...");
  };

  const hideLoadingAnimation = () => {
    elements.runTestsBtn.prop("disabled", false).text("Run Tests");
  };

  const handleError = (error) => {
    console.log("error", error);
  };

  elements.runTestsBtn.on("click", async () => {
    showLoadingAnimation();
    try {
      const response = await fetch(TEST_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          body: elements.team.val()
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
        const data = await response.json();
        handleTestResult(data);
      } catch (error) {
        handleError(error);
      } finally {
        hideLoadingAnimation();
      }
    });
  })();
});
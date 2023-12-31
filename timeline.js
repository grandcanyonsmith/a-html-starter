var timelineItems = [
    { year: "2019", event: "Company Founded" },
    { year: "2020", event: "First Major Investment" },
    { year: "2021", event: "Break-even Point Achieved" },
    //... add more items as needed
];

window.onload = function () {
    var timeline = document.getElementById("timeline");

    for (var i = 0; i < timelineItems.length; i++) {
        var newElement = document.createElement("div");
        var yearElement = document.createElement("h2");
        var eventElement = document.createElement("p");

        yearElement.innerText = timelineItems[i].year;
        eventElement.innerText = timelineItems[i].event;

        newElement.appendChild(yearElement);
        newElement.appendChild(eventElement);

        timeline.appendChild(newElement);
    }
}

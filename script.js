let currentQuestionIndex = 0;
let answers = [];

document.getElementById('next').addEventListener('click', () => {
    let answer = document.getElementById('answer').value;
    if (answer !== '') {
        answers[currentQuestionIndex] = answer;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showSummary();
    }
});

document.getElementById('skip').addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showSummary();
    }
});

function loadQuestion() {
    document.getElementById('question').innerText = questions[currentQuestionIndex].question;
    document.getElementById('answer').value = answers[currentQuestionIndex] || '';
}

function showSummary() {
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('summary').style.display = 'block';
    let html = '';
    for (let i = 0; i < questions.length; i++) {
        html += `<p><strong>${questions[i].question}</strong><br>${answers[i] || 'Skipped'}</p>`;
    }
    document.getElementById('answers').innerHTML = html;
}

loadQuestion();

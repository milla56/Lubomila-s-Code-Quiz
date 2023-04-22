
let timeId = document.querySelector('#time');
let startBtn = document.querySelector('#start');
let questionsId = document.querySelector('#questions');
let choicesId = document.querySelector('#choices');
let userInitials = document.querySelector('#initials');
let submitBtn = document.querySelector('#submit');
let feedbackUser = document.querySelector('#feedback');


let currentQuestion = 0;
let remainingTime = questionsId.length * 15;
let timeInterval;


// Start the quiz
function startQuiz(){
    let startScreen = document.querySelector('#start-screen');
    startScreen.style.display = 'none';
    questionsId.removeAttribute('class');
    showQuestion();
    timeInterval = setInterval(updateTime, 1000);
}

// Show the current question and answers
function showQuestion() {
    const questionTitle = document.querySelector('#question-title');
    questionTitle.textContent = questions[currentQuestion].question;
    choicesId.innerHTML = '';

    for (let i = 0; i < questions[currentQuestion].answer.length; i++) {
        const button = document.createElement('button');
        button.textContent = questions[currentQuestion].answer[i];
        button.addEventListener('click', checkAnswer);
        choicesId.appendChild(button);
    }
}

// Audio
// var soundCorrect = new Audio("audio/correct.wav");
// var soundIncorrect = new Audio("audio/incorrect.wav");

// Check if andswer is correct
function checkAnswer(event) {
    event.preventDefault();
    const clickedAnswer = event.target.textContent;
    if(clickedAnswer === questions[currentQuestion].correctAnswer){
        currentQuestion++;
        if(currentQuestion === questions.length){
            endQuiz();
        } else {
            showQuestion();
            // soundCorrect.play();
        }
        feedbackUser.textContent = 'Correct 👌';
        
        
    } else {
        remainingTime -= 10;
        feedbackUser.textContent = 'Incorrect 👎'; 
    }
   
    feedbackUser.removeAttribute('class', 'hide');
    setTimeout(function(){
        feedbackUser.setAttribute('class', 'hide');
    }, 500);
}

// update the time remaining
function updateTime() {
    timeId.textContent = remainingTime;
    remainingTime--;
    if(remainingTime <= 0){
        endQuiz();
    }
}

// End of the quiz
function endQuiz() {
    clearInterval(timeInterval);
    const endScreen = document.querySelector('#end-screen');
    endScreen.removeAttribute('class');
    const finalScore = document.querySelector('#final-score');
    finalScore.textContent = remainingTime;
    questionsId.setAttribute('class', 'hide');
}

// Save the score with initials
function saveScore() {
    const initials = userInitials.value.trim();

    if(initials !== ''){
    let existingScore = JSON.parse(localStorage.getItem('highscore')) || [];
    let newScore = {
        score: remainingTime,
        userInitials: initials,
    }
    existingScore.push(newScore);
    localStorage.setItem('highscore', JSON.stringify(existingScore));
    window.location.href = 'highscores.html';
    }
}

function pressEnter(event) {
    if (event.key === "Enter") {
      saveScore();
    }
  }

startBtn.addEventListener('click', startQuiz);
submitBtn.addEventListener('click', saveScore);
userInitials.addEventListener('keyup', pressEnter);




var time = document.querySelector("#time");
var startButton = document.querySelector("#start");
var questions = document.querySelector("#questions");
var choices = document.querySelector('#choices');
var userInitial = document.querySelector('#initial');
var submit = document.querySelector('#submit');
var feedbackUser = document.querySelector('#feedback');

let currentQuestion = 0;
let remainingTime = questions.lenght*15;
let timeInterval;
var timer;
var timerCount;

// Set the sound 
// let winSound = new Audio('correct.wav');
// //winSound();
// let losesound = new Audio('incorrect.wav');
//losesound();

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        winGame();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}

// The startQuiz function 

function startQuiz (){
  let startScreen = document.querySelector('#start-screen');
  startScreen.style.display = 'none';
  questions.removeAttribute('class');
  showQuestion();
  timeInterval = setInterval(updateTime, 1000);
  
}
// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);


//Show the current question and answer
function showQuestion(){
  const questionTitle = document.querySelector('#question-title');
  questionTitle.textContent = questions[currentQuestion].question;
  choices.innerHTML = '';

  for (var i=0;i< questions[currentQuestion].question; i++){
    const button = document.createElement('button');
    button.textContent = questions[currentQuestion].answer[i];
    button.addEventListener('click',checkAnswer);
    choices.appendChild('button');
  }
}

// Check if answer is correct
function checkAnswer(event) {
  event.preventDefault();
  const clickedAnswer = event.target.textContent;
  if(clickedAnswer === questions[currentQuestion].correctAnswer){
      currentQuestion++;
      if(currentQuestion === questions.length){
          endQuiz();
      } else {
          showQuestion();
      }
      feedbackUser.textContent = 'Correct ';
  } else {
      remainingTime -= 10;
      updateTime();
      feedbackUser.textContent = 'Incorrect '
  }
  feedbackUser.removeAttribute('class', 'hide');
  setTimeout(function(){
      feedbackUser.setAttribute('class', 'hide');
  }, 500);
}



// remaining time
function remainingTime(){
  time.textContent = remainingTime;
  remainingTime --;
  if (remainingTime <= 0){
    endQuiz();
  }
}

// End Quiz
function endQuiz(){
  clearInterval(timeInterval);
  const endScreen = document.querySelector('#end-screen');
  endScreen.removeAttribute('class');
  const finalScore = document.querySelector('#final-score');
  finalScore.textContent = remainingTime;
  questions.setAttribute('class','hide');
}
  
//Save score
function saveScore(){
  const initials = userInitial.ariaValueMax.trim();
  if (initials !== ''){
    var existingScore = JSON.parse(localStorage.getItem('highscores')) || [];
    var newScore = {
      score:remainingTime,
     userInitial: initials,
    }
    existingScore.push(newScore);
    localStorage.setItem('highscore',JSON.stringify(existingScore));
    window.location.href = 'highscores.html';
  }
}

function pressEnter(event){
  if (event.key === 'Enter' ){
    saveScore();
  }
}

startBtn.addEventListener('click', startQuiz);
submit.addEventListener('click', saveScore);
userInitial.addEventListener('keyup', pressEnter);
var time = document.querySelector("#time");
var startButton = document.querySelector("#start");
var questions = document.querySelector("#questions");
var choices = document.querySelector('#choices');
var userInitial = document.querySelector('#initial');
var submit = document.querySelector('#submit');
var feedback = document.querySelector('#feedback');

let currentQuestion = 0;
let remainingTime = questions.lenght*15;
let timeInterval;

// The startQuiz function 

function startQuiz (){
  let startScreen = document.querySelector('#start-screen');
  startScreen.style.display = 'none';
  questions.removeAttribute('class');
  showQuestion();
  timeInterval = setInterval(updateTime, 1000);
}


//Show the current question and answer
function showQuestion(){
  const questionTitle = document.querySelector('#question-title');
  questionTitle.textContent = questions[currentQuestion].question;
  choices.innerHTML = '';
}
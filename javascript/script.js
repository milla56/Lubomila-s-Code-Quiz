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

// Set the sound 
let winSound = new Audio('correct.wav');
winSound();

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

  for (var i=0;i< questions[currentQuestion].question; i++){
    const button = document.createElement('button');
    button.textContent = questions[currentQuestion].answer[i];
    button.addEventListener('click',checkAnswer);
    choices.appendChild('button');
  }
}

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

 // correct answer + move to the next question
     // if all questions are correct
     //substract 10 seconds from the timer

      //remove the class of hide to show feedback
      // set time for how long to display feedback

      // update the time remaining

      // End of the quiz


      //alert and sound parenthis 5 questions
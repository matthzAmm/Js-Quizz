const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// Perguntas

const questions = [
    {
        // pergunta base
      "question": "PHP foi desenvolvido para qual fim?",

        // objeto das respostas
      "answers": [
        {

            //resposta
          "answer": "back-end",

            //vericidade
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
  ]

// startGame 

function init(){

    createQuestion(0);

}

function createQuestion(i){

    // clear
    const oldButtons = answersBox.querySelectorAll("button");

    oldButtons.forEach(function(btn) {
        btn.remove();
        
    });

    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // start alternativas

    questions[i].answers.forEach(function(answer, i){

      // Cria o template do botão
      const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

      const letterBtn = answerTemplate.querySelector(".btn-letter");
      const answerText = answerTemplate.querySelector(".question-answer");

      letterBtn.textContent = letters[i];
      answerText.textContent = answer['answer'];

      answerTemplate.setAttribute("correct-answer", answer["correct"]);

      // remove hide
      answerTemplate.classList.remove("hide");
      answerTemplate.classList.remove("answer-template");

      answersBox.appendChild(answerTemplate);

      answerTemplate.addEventListener("click", function(){
        checkAnswer(this);
      })
    })

    actualQuestion++;
}

// Verificacao

function checkAnswer(btn){

  const buttons = answersBox.querySelectorAll("button");

  buttons.forEach(function(button){
    
    if(button.getAttribute("correct-answer") == "true"){
      
      if(btn == button){
        points++;
      }
      button.classList.add("correct-answer");
    }
    else{
      button.classList.add("wrong-answer");
    }
  });

  nextQuestion();

}


function nextQuestion(){

  setTimeout(() => {
    
    if(actualQuestion >= questions.length){

      showFinalscreen();
      return;
    }

    createQuestion(actualQuestion);
  }, 500);

}

function showFinalscreen(){

  toggleQuizzScreen();

  const score = ((points/ questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector("#display-score span");

  displayScore.textContent = score.toString();

  const correctAnswers = document.querySelector("#correct-answers");
  correctAnswers.textContent = points;

  const totalAnswers = document.querySelector("#questions-qty");
  totalAnswers.textContent = questions.length;
}

function toggleQuizzScreen(){

  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");

}

// Restart

const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function(){

  actualQuestion = 0;
  points = 0;
  toggleQuizzScreen();
  init();

})

// Inicialização do quizz
init();
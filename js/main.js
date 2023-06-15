// Selectores (id)
// Nav bar
const navBarSelector = document.querySelector("#nav-bar");
const homePageNavSelector = document.querySelector("#home-page-nav");
const questionPageNavSelector = document.querySelector("#question-page-nav");
const resultsPageNavSelector = document.querySelector("#results-page-nav");
const graphicsPageNavSelector = document.querySelector("#graphics-page-nav");

// Páginas
const homePageSelector = document.querySelector("#home-page");
const questionPageSelector = document.querySelector("#question-page");
const resultsPageSelector = document.querySelector("#results-page");
const graphicsPageSelector = document.querySelector("#graphics-page");

// Inputs
const startInputSelector = document.querySelector("#start-input");
const nextInputSelector = document.querySelector("#next-input");
const finishInputSelector = document.querySelector("#finish-input");
const returnInputSelector = document.querySelector("#return-input");

const newButtonSelector = document.querySelectorAll(".response");

// Containers
const questionContainerSelector = document.querySelector("#question-container");

// Párrafos
const questionTextSelector = document.querySelector("#question-text");

// Clases
const hideSelector = document.querySelectorAll(".hide");

// Variables globales
let objectQuestions = {};

let questionsArray = [];
let usedQuestionsArray = [];
let incorrectAnswersArray = [];
let totalAnswersArray = [];

let questionString = "";
let correctAnswerString = "";
let incorrectAnswersString = "";
let answerSelected = "";

let newButton;

let indexQuestion = 0;
let idAnswer = 0;

// Api. En la api puedes seleccionar el número de pregutnas y su dificultad y tipo.
// Obtenemos los datos de la api y los guardamos en variables globales
axios
  .get("https://opentdb.com/api.php?amount=10&category=23&difficulty=easy")
  .then((res) => {
    questionsArray = res.data.results;

    console.log(res);

    questionsArray.forEach((objectQuestions) => {
      questionString = objectQuestions.question;
      correctAnswerString = objectQuestions.correct_answer;
      incorrectAnswersArray = objectQuestions.incorrect_answers;

      // console.log(incorrectAnswersArray);
    });
    incorrectAnswersArray.forEach((incorrectAnswer) => {
      incorrectAnswersString = incorrectAnswer;
    });
  })
  .catch((err) => console.log(err));

// Timers
const nextQuestionTime = () =>
  setTimeout(() => console.log("Siguiente pregunta"), 3000);

// Funcionalidad
// Incrementamos en uno el índice y cambiamos de pregunta
const nextQuestion = () => {
  questionsArray;
};

// Comprobamos que la respuesta es correcta o no
const checkAnswers = (answerSelected) => {
  console.log(answerSelected);
  if (answerSelected === true) {
    console.log("correcto");
    // nextQuestion();
  } else {
    console.log("incorrecto");
    // nextQuestion();
  }
};

const selectAnswer = () => {
  console.log(newButton)
  answerSelected = newButton.dataset;
  checkAnswers(answerSelected);
};

// Escribimos en el dom la pregunta y las respuestas
const writeAnswers = () => {
  totalAnswersArray.forEach((answer) => {
    newButton = document.createElement("button");
    newButton.innerText = answer;

    newButton.setAttribute("id", idAnswer++);
    newButton.setAttribute("class", "answer");
    newButton.setAttribute("value", answer);

    if (newButton.value == correctAnswerString) {
      newButton.dataset.correct = true;
    } else {
      newButton.dataset.correct = false;
    }
    // console.log(newButton);
    newButton.addEventListener("click", selectAnswer);
    questionContainerSelector.appendChild(newButton);
  });
};

const writeQuestion = () => {
  questionTextSelector.innerHTML = questionString;
  writeAnswers();
};

const resetQuestion = () => {
  questionTextSelector.innerHTML = "";
  writeQuestion();
};

const startQuest = () => {
  indexQuestion = 0;
  startInputSelector.classList.add("hide");
  resetQuestion();
};

// Guardamos en array las respuestas para tenerlas todas juntas
const totalAnswers = () => {
  incorrectAnswersArray.forEach((incorrectAnswer) => {
    totalAnswersArray.push(incorrectAnswer);
  });

  totalAnswersArray.push(correctAnswerString);

  startQuest();
};

// Ocultar páginas
const hidePages = () => {
  homePageSelector.classList.add("hide");
  questionPageSelector.classList.add("hide");
  resultsPageSelector.classList.add("hide");
  graphicsPageSelector.classList.add("hide");
};

// Moverse entre páginas
const goHomePage = () => {
  hidePages();
  homePageSelector.classList.remove("hide");
};

const goQuestionPage = () => {
  hidePages();
  totalAnswers();
  questionPageSelector.classList.remove("hide");
};

const goResultsPage = () => {
  hidePages();
  resultsPageSelector.classList.remove("hide");
};

const goGraphicsPage = () => {
  hidePages();
  graphicsPageSelector.classList.remove("hide");
};

// Events click
returnInputSelector.addEventListener("click", goHomePage);
startInputSelector.addEventListener("click", goQuestionPage);
nextInputSelector.addEventListener("click", nextQuestion);
finishInputSelector.addEventListener("click", goGraphicsPage);

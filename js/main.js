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
let selectQuestion = {};

let questionsArrayObjects = [];
let questionsArray = [];
let usedquestionsArrayObjects = [];
let incorrectAnswersArray = [];
let totalAnswersArray = [];

let questionsString = "";
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
    questionsArrayObjects = res.data.results;

    console.log(res);

    // Adaptamos la api para nuestro uso
    questionsArrayObjects.forEach((objectQuestions) => {
      questionsString = objectQuestions.question;
      correctAnswerString = objectQuestions.correct_answer;
      incorrectAnswersArray = objectQuestions.incorrect_answers;
      questionsArray.push(questionsString);

    });
    // console.log(questionsArrayObjects[2]);
    incorrectAnswersArray.forEach((incorrectAnswer) => {
      incorrectAnswersString = incorrectAnswer;
    });
  })
  .catch((err) => console.log(err));

// Timers
const nextQuestionTime = () =>
  setTimeout(() => console.log("Siguiente pregunta"), 3000);

// Funcionalidad

// Comprobar respuesta
const checkAnswer = () => {};

// Seleccionar respuesta
const selectAnswer = () => {};

// Mostrar respuestas
const showAnswers = () => {
  totalAnswersArray.forEach((answer) => {
    console.log(answer);
  });
};

// Mostrar pregunta
const showQuestion = (questionsString) => {
  questionTextSelector.innerHTML = questionsString;
  setAnswers();
};

// Preparamos respuesta
const setAnswers = () => {
  console.log(incorrectAnswersArray);
  console.log(correctAnswerString);
};

// Preparamos pregunta
const setQuestion = () => {
  questionsString = questionsArray[indexQuestion];
  showQuestion(questionsString);
};

// Siguiente pregunta
const nextQuestion = () => {
  indexQuestion++;
  setQuestion();
};

// Empezamos el juego
const startGame = () => {
  indexQuestion = 0;
  setQuestion();
};

// Ocultar páginas
const hidePages = () => {
  homePageSelector.classList.add("hide");
  questionPageSelector.classList.add("hide");
  resultsPageSelector.classList.add("hide");
  graphicsPageSelector.classList.add("hide");
};

const hideButtons = () => {
  returnInputSelector.classList.add("hide");
  startInputSelector.classList.add("hide");
  nextInputSelector.classList.add("hide");
  finishInputSelector.classList.add("hide");
};

// Moverse entre páginas
const goHomePage = () => {
  hidePages();
  hideButtons();
  homePageSelector.classList.remove("hide");
  startInputSelector.classList.remove("hide");
};

const goQuestionPage = () => {
  hidePages();
  hideButtons();
  questionPageSelector.classList.remove("hide");
  nextInputSelector.classList.remove("hide");
  startGame();
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

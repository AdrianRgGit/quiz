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
let questionsArray = [];
let incorrectAnswersArray = [];
let totalAnswersArray = [];

let questionString = "";
let correctAnswerString = "";
let incorrectAnswersString = "";

let indexQuestion = 0;

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

// Funcionalidad

const nextQuestion = () => {};

const checkAnswers = () => {
  if (newButtonSelector.value == correctAnswerString) {
    console.log("correcto");
  } else {
    console.log("incorrecto");
  }
};

// Escribimos en el dom la pregunta y las respuestas
const writeAnswers = () => {
  totalAnswersArray.forEach((answer) => {
    const newButton = document.createElement("button");
    newButton.innerText = answer;
    newButton.setAttribute("value", answer);
    newButton.setAttribute("class", "response");

    questionContainerSelector.appendChild(newButton);
    checkAnswers();
  });
};

const writeQuestion = () => {
  questionTextSelector.innerHTML = questionString;
  writeAnswers();
};

const startQuest = () => {
  indexQuestion = 0;
  startInputSelector.classList.add("hide");
  writeQuestion();
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
nextInputSelector.addEventListener("click", goResultsPage);
finishInputSelector.addEventListener("click", goGraphicsPage);

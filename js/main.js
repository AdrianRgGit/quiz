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
const finishInputSelector = document.querySelector("#finish-input");
const returnInputSelector = document.querySelector("#return-input");

// Containers
const questionContainerSelector = document.querySelector("#question-container");
const answersContainerSelector = document.querySelector("#answers-container");
const indexContainerSelector = document.querySelector("#index-container");
const resultsContainerSelector = document.querySelector("#results-container");

// Párrafos
const questionTextSelector = document.querySelector("#question-text");
const indexQuestionSelector = document.querySelector("#index-question");
const scoreSelector = document.querySelector("#score");
const questionTitleSelector = document.querySelector("#question-title");

// Clases
const hideSelector = document.querySelectorAll(".hide");

// Variables globales
let objectQuestions = {};
let selectQuestion = {};

let questionsArrayObjects = [];
let questionsArray = [];
let incorrectAnswersArray = [];
let totalAnswersArray = [];
let selectIncorrectAnswersArray = [];
let randomAnswersArray = [];

let questionsString = "";
let correctAnswerString = "";
let incorrectAnswersString = "";
let answerSelected = "";
let selectCorrectAnswer = "";

let answerButton;

let indexQuestion = 0;
let indexCorrectQuestion = 0;
let indexIncorrectQuestion = 0;

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
    incorrectAnswersArray.forEach((incorrectAnswer) => {
      incorrectAnswersString = incorrectAnswer;
    });
  })
  .catch((err) => console.error(err));

// Timers
const nextQuestionTime = () =>
  setTimeout(() => {
    nextQuestion();
  }, 3000);

// Funcionalidad

// Terminamos el Juego
const finishQuiz = () => {
  goResultsPage();
  scoreSelector.innerHTML = indexCorrectQuestion;
};

// Comprobar respuesta
const checkAnswers = () => {
  // Pintamos los botones
  answersContainerSelector.appendChild(answerButton);
  console.log(answerButton)
  // El event.target accede al elemento y de ahí le sacamos el dataset.correct. De otra forma no he podido acceder a él
  answerButton.addEventListener("click", (event) => {
    if (event.target.dataset.correct == "true") {
      indexCorrectQuestion++;
      console.log("Correcto " + indexCorrectQuestion);
      nextQuestionTime();
    } else {
      indexIncorrectQuestion++;
      console.log("Incorrecto " + indexIncorrectQuestion);
      nextQuestionTime();
    }
  });
};

// Creamos los botones de las respuestas y diferenciamos la correcta de las incorrectas
const createAnswers = () => {
  // Alteramos aleatoriamente el orden de las respuestas
  randomAnswersArray = totalAnswersArray.sort(() => Math.random() - 0.5);

  // answersContainerSelector.appendChild(correctButton);
  // Creamos todos los botones
  randomAnswersArray.forEach((answer) => {
    answerButton = document.createElement("button");
    answerButton.classList.add("answer-button", "btn", "btn-secondary", "m-1");
    answerButton.innerText = answer;

    // Obtenemos la respuesta correcta y le asignamos un dataset para diferenciarla
    if (answer === selectCorrectAnswer) {
      answerButton.dataset.correct = true;
    }

    checkAnswers();
  });
};

// Mostrar pregunta
const createQuestion = (selectQuestion) => {
  questionTitleSelector.innerHTML = `Question number <span class = "text-warning">${
    indexQuestion + 1
  }</span>`;
  questionTextSelector.innerHTML = selectQuestion;
  createAnswers();
};

// Preparamos pregunta y respuesta
const setQuestion = () => {
  selectQuestion = questionsArrayObjects[indexQuestion].question;
  selectCorrectAnswer = questionsArrayObjects[indexQuestion].correct_answer;
  selectIncorrectAnswersArray =
    questionsArrayObjects[indexQuestion].incorrect_answers;

  selectIncorrectAnswersArray.forEach((incorrectAnswer) => {
    totalAnswersArray.push(incorrectAnswer);
  });

  totalAnswersArray.push(selectCorrectAnswer);

  createQuestion(selectQuestion);
};

// Siguiente pregunta
const nextQuestion = () => {
  indexQuestion++;
  totalAnswersArray = [];
  indexQuestionSelector.innerHTML = `${indexQuestion + 1} / 10 `;

  while (answersContainerSelector.firstChild) {
    answersContainerSelector.removeChild(answersContainerSelector.firstChild);
  }

  if (questionsArrayObjects.length === indexQuestion) {
    finishQuiz();
  } else {
    setQuestion();
  }
};

// Empezamos el juego
const startGame = () => {
  indexQuestion = 0;
  indexQuestionSelector.innerHTML = `${indexQuestion + 1} / 10 `;
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
finishInputSelector.addEventListener("click", goGraphicsPage);

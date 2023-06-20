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
const restartPageSelector = document.querySelector("#restart-page");

// Inputs
const startInputSelector = document.querySelector("#start-input");
const graphicsInputSelector = document.querySelector("#graphics-input");
const nextInputSelector = document.querySelector("#next-input");
const restartInputSelector = document.querySelector("#restart-input");

// Containers
const questionContainerSelector = document.querySelector("#question-container");
const answersContainerSelector = document.querySelector("#answers-container");
const indexContainerSelector = document.querySelector("#index-container");
const resultsContainerSelector = document.querySelector("#results-container");
const scoreContainerSelector = document.querySelector("#score-container");

// Párrafos
const questionTextSelector = document.querySelector("#question-text");
const indexQuestionSelector = document.querySelector("#index-question");
const textResultsSelector = document.querySelector("#text-results");
const scoreSelector = document.querySelector("#score");
const questionTitleSelector = document.querySelector("#question-title");
const resultsSelector = document.querySelector("#results");

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
let correctAnswerSelector;

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
  resultsSelector.innerHTML = "These are your results...";
  console.log(scoreContainerSelector);

  // mostramos un texto según el resultado
  if (indexCorrectQuestion < 5) {
    scoreSelector.innerHTML = indexCorrectQuestion + "/10";
    scoreContainerSelector.classList.add("bg-danger");
    textResultsSelector.innerHTML = "You failed the test, keep studying";
  } else {
    scoreSelector.innerHTML = indexCorrectQuestion + "/10";
    scoreContainerSelector.classList.add("bg-success");
    textResultsSelector.innerHTML =
      "You have passed the test, congratulations!";
  }
};

// Comprobar respuesta
const checkAnswers = () => {
  // Pintamos los botones
  answersContainerSelector.appendChild(answerButton);
  console.log(answerButton);
  // El event.target accede al elemento y de ahí le sacamos el dataset.correct. De otra forma no he podido acceder a él
  answerButton.addEventListener("click", (event) => {
    if (event.target.dataset.correct == "true") {
      // si la respuesta correcta está en la última opción esta línea da error
      // correctAnswerSelector.classList.add("btn-success");
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
      answerButton.setAttribute("id", "correct-answer");
      answerButton.dataset.correct = true;
    }

    correctAnswerSelector = document.querySelector("#correct-answer");
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
    console.clear();
    setQuestion();
  }
};

// Empezamos el juego
const startGame = () => {
  indexQuestion = 0;
  indexCorrectQuestion = 0;
  indexIncorrectQuestion = 0;
  indexQuestionSelector.innerHTML = `${indexQuestion + 1} / 10 `;
  setQuestion();
};

// Ocultar páginas
const hidePages = () => {
  homePageSelector.classList.add("hide");
  questionPageSelector.classList.add("hide");
  resultsPageSelector.classList.add("hide");
  graphicsPageSelector.classList.add("hide");
  restartPageSelector.classList.add("hide");
};

const hideButtons = () => {
  startInputSelector.classList.add("hide");
  graphicsInputSelector.classList.add("hide");
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

const goRestartPage = () => {
  hidePages();
  hideButtons();
  restartPageSelector.classList.remove("hide");
}

const goGraphicsPage = () => {
  hidePages();
  graphicsPageSelector.classList.remove("hide");
};

// Events click
startInputSelector.addEventListener("click", goQuestionPage);
graphicsInputSelector.addEventListener("click", goGraphicsPage);
nextInputSelector.addEventListener("click", goRestartPage);
restartInputSelector.addEventListener("click", goHomePage);
const homePageSelector = document.querySelector("#home-page");
const questionPageSelector = document.querySelector("#question-page");
const resultsPageSelector = document.querySelector("#results-page");
const graphicsPageSelector = document.querySelector("#graphics-page");
const restartPageSelector = document.querySelector("#restart-page");

const startInputSelector = document.querySelector("#start-input");
const graphicsInputSelector = document.querySelector("#graphics-input");
const nextInputSelector = document.querySelector("#next-input");
const restartInputSelector = document.querySelector("#restart-input");
const returnInputSelector = document.querySelector("#return-input");
const finishInputSelector = document.querySelector("#finish-input");

const nameInputSelector = document.querySelector("#name-input");

const answersContainerSelector = document.querySelector("#answers-container");
const scoreContainerSelector = document.querySelector("#score-container");
const userCardSelector = document.querySelector("#user-card");

const questionTextSelector = document.querySelector("#question-text");
const indexQuestionSelector = document.querySelector("#index-question");
const textResultsSelector = document.querySelector("#text-results");
const scoreSelector = document.querySelector("#score");
const questionTitleSelector = document.querySelector("#question-title");
const resultsSelector = document.querySelector("#results");

let objectQuestions = {};
let selectQuestion = {};
let user = {};

let questionsArrayObjects = [];
let questionsArray = [];
let incorrectAnswersArray = [];
let totalAnswersArray = [];
let selectIncorrectAnswersArray = [];
let randomAnswersArray = [];

let questionsString = "";
let correctAnswerString = "";
let incorrectAnswersString = "";
let selectCorrectAnswer = "";
let keyUser = "";

let answerButton;
let correctAnswerSelector;

let indexQuestion = 0;
let indexCorrectQuestion = 0;
let indexIncorrectQuestion = 0;

axios
  .get("https://opentdb.com/api.php?amount=10&category=23&difficulty=easy")
  .then((res) => {
    questionsArrayObjects = res.data.results;

    console.log(res);

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

const nextQuestionTime = () =>
  setTimeout(() => {
    nextQuestion();
  }, 1500);

const createUserCard = () => {
  const getUser = JSON.parse(localStorage.getItem(keyUser));

  // Me da null al iniciar directamente desde el botón de graphics
  userCardSelector.innerHTML += `
  <div class="card text-white bg-info mb-3" style="max-width: 20rem;">
  <div class="card-header">${getUser.name} </div>
  <div class="card-body">
    <h4 class="card-title">${getUser.score} </h4>
  </div>
</div>
  `;
};

const userRegister = () => {
  user = {
    name: nameInputSelector.value,
    score: indexCorrectQuestion,
  };

  keyUser = nameInputSelector.value;

  localStorage.setItem(keyUser, JSON.stringify(user));
};

const finishQuiz = () => {
  goResultsPage();
  resultsSelector.innerHTML = "These are your results...";
  console.log(scoreContainerSelector);

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

const checkAnswers = () => {
  answersContainerSelector.appendChild(answerButton);
  console.log(answerButton);

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

const createAnswers = () => {
  randomAnswersArray = totalAnswersArray.sort(() => Math.random() - 0.5);

  randomAnswersArray.forEach((answer) => {
    answerButton = document.createElement("button");
    answerButton.classList.add("answer-button", "btn", "btn-secondary", "m-1");
    answerButton.innerText = answer;

    if (answer === selectCorrectAnswer) {
      answerButton.setAttribute("id", "correct-answer");
      answerButton.dataset.correct = true;
    }

    correctAnswerSelector = document.querySelector("#correct-answer");
    checkAnswers();
  });
};

const createQuestion = (selectQuestion) => {
  questionTitleSelector.innerHTML = `Question number <span class = "text-warning">${
    indexQuestion + 1
  }</span>`;
  questionTextSelector.innerHTML = selectQuestion;
  createAnswers();
};

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

const nextQuestion = () => {
  indexQuestion++;
  totalAnswersArray = [];
  indexQuestionSelector.innerHTML = `${indexQuestion + 1} / 10 `;

  while (answersContainerSelector.firstChild) {
    answersContainerSelector.removeChild(answersContainerSelector.firstChild);
  }

  if (questionsArrayObjects.length === indexQuestion) {
    finishQuiz();
    userRegister();
  } else {
    console.clear();
    setQuestion();
  }
};

const startGame = () => {
  indexQuestion = 0;
  indexCorrectQuestion = 0;
  indexIncorrectQuestion = 0;
  indexQuestionSelector.innerHTML = `${indexQuestion + 1} / 10 `;
  setQuestion();
};

const hidePages = () => {
  homePageSelector.classList.add("hide");
  questionPageSelector.classList.add("hide");
  resultsPageSelector.classList.add("hide");
  restartPageSelector.classList.add("hide");
  graphicsPageSelector.classList.add("hide");
};

const hideButtons = () => {
  startInputSelector.classList.add("hide");
  graphicsInputSelector.classList.add("hide");
};

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
};

const goGraphicsPage = () => {
  hidePages();
  createUserCard();
  graphicsPageSelector.classList.remove("hide");
};

startInputSelector.addEventListener("click", goQuestionPage);
nextInputSelector.addEventListener("click", goRestartPage);
restartInputSelector.addEventListener("click", goHomePage);
returnInputSelector.addEventListener("click", goHomePage);
graphicsInputSelector.addEventListener("click", goGraphicsPage);
finishInputSelector.addEventListener("click", goGraphicsPage);
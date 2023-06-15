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



// Clases
const hideSelector = document.querySelectorAll(".hide");

// Ocultar páginas
const hidePages = () =>{
    homePageSelector.classList.add("hide")
    questionPageSelector.classList.add("hide")
    resultsPageSelector.classList.add("hide")
    graphicsPageSelector.classList.add("hide")
}

// Moverse entre páginas
const goHomePage = () => {
    hidePages();
    homePageSelector.classList.remove("hide")
}

const goQuestionPage = () => {
    hidePages();
    questionPageSelector.classList.remove("hide")
}

const goResultsPage = () => {
    hidePages();
    resultsPageSelector.classList.remove("hide")
}

const goGraphicsPage = () => {
    hidePages();
    graphicsPageSelector.classList.remove("hide")
}

// Events click
startInputSelector.addEventListener("click", goQuestionPage)
nextInputSelector.addEventListener("click", goResultsPage)
finishInputSelector.addEventListener("click", goGraphicsPage)
returnInputSelector.addEventListener("click", goHomePage)



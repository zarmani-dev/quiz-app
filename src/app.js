//DOM selectors
const question = document.querySelector(".question");
const buttonContainer = document.querySelector(".buttons");
const nextBtn = document.querySelector(".next-button");

// Fetch API & Display output

const url = "https://opentdb.com/api.php?amount=4&difficulty=easy&type=multiple";

function fetchApi(path) {
    fetch(path)
    .then(res => res.json())
    .then(data => displayOutput(data))
};


let currentIndex = 0;
let score = 0;
let trivia;

const startQuiz = () => {
    currentIndex = 0;
    score = 0;
    fetchApi(url);
}

startQuiz();

function displayOutput(data) {
    resetState();

    trivia = data.results;
    let currentQueston = trivia[currentIndex];
    let currentAnswer = currentQueston.correct_answer;

    question.innerHTML = `${currentIndex + 1}. ${currentQueston.question}`;
    let answers = [...currentQueston.incorrect_answers, currentQueston.correct_answer];
    let shuffledAnswers = shuffle(answers);
    shuffledAnswers.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer;
        buttonContainer.appendChild(button);
        button.classList.add("answer-button");

        button.addEventListener("click", (e) => {
            if (e.target.innerHTML === currentAnswer) {
                e.target.classList.add("correct");
                score++;
            } else {
                e.target.classList.add("incorrect");
            }
            Array.from(buttonContainer.children).forEach(button => {
                if(button.innerHTML === currentAnswer) {
                    button.classList.add("correct");
                }
                button.disabled = true;
            })

            nextBtn.style.display = "block";
        });

    })
}

nextBtn.addEventListener("click", () => {
    if(currentIndex < trivia.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

function handleNextButton() {
    currentIndex++;
    if(currentIndex < trivia.length) {
        fetchApi(url);
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    question.innerHTML = `You scored ${score} out of ${trivia.length}`;
    nextBtn.innerHTML = "Play Again!";
    nextBtn.style.display = "block";
    
}

function resetState() {
    nextBtn.style.display = "none";
    while(buttonContainer.firstChild) {
        buttonContainer.removeChild(buttonContainer.firstChild)
    }
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

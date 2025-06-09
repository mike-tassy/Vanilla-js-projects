const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endGameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// random word aysnc function
async function getWord() {
  const response = await fetch(
    "https://random-word-api.vercel.app/api?words=1"
  );
  const words = await response.json();
  return words[0];
}

// async function ranWord() {
//   const words = await getWord();
//   console.log(words);
// }

// ranWord();

// Init word
let randomWord;

// init score
let score = 0;

//init time
let time = 10;

//set difficulty to value in local storage in  ls or medium
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//foucs text on start
text.focus();

//start counting down
const timeInterval = setInterval(updateTime, 1000);

// add word to dom
async function addWordToDom() {
  randomWord = await getWord();
  word.innerHTML = randomWord;
}

addWordToDom();

//update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    //end game
    gameOver();
  }
}

//game over , show and screen
function gameOver() {
  endGameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick='location.reload()'>Reload</button>
    `;

  endGameEl.style.display = "flex";
}

//update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

//event listners
//typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDom();
    updateScore();

    //clear
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

//settings btn click
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

//settings select
difficultySelect.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

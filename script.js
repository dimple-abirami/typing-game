const word = document.getElementById("word");
const input_textfield = document.getElementById("text");
const score1 = document.getElementById("score");
const time1 = document.getElementById("time");
const end_game = document.getElementById("end-game-container");
const settings_btn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settings_form = document.getElementById("settings-form");
const difficulty_select = document.getElementById("difficulty");

//list of words for the game
const words = [
  "good",
  "freedom",
  "north",
  "independent",
  "pride",
  "proud",
  "emergency",
  "loyalty",
  "urge",
  "eighty",
  "admiring",
  "patience",
  "water",
  "lovable",
  "mother",
  "silver",
  "individual",
  "truthful",
  "winner",
  "mountain",
  "gold",
  "random",
];

//random word

let randomWord;

//score

let score = 0;
//set difficulty to medium
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";
//set difficulty select value
difficulty_select.value = difficulty;
//time
let time = 10;
//to focus on text on start
input_textfield.focus();
//start countdown
const timeInterval = setInterval(updateTime, 1000);

//generate random words
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
//add  word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
//to update score
function updateScore() {
  score++;
  score1.innerHTML = score;
}
//to update time
function updateTime() {
  time--;
  time1.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    //end game
    gameOver();
  }
}
//game over!!
function gameOver() {
  end_game.innerHTML = `
    <h1>Time Over!!</h1>
    <p>Your Final Score is ${score} </p>
    <button onclick="location.reload()">Reload</button>
    `;

  end_game.style.display = "flex";
}

addWordToDOM();

//typing
input_textfield.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
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
//settings button
settings_btn.addEventListener("click", () => settings.classList.toggle("hide"));
settings_form.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});


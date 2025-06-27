const msgEL = document.getElementById("msg");

const randomNum = getRandomNumber();

console.log("Number:", randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let regocnition = new window.SpeechRecognition();

//start regocnition and game
regocnition.start();

//capture user speech
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

// write what user speaks
function writeMessage(msg) {
  msgEL.innerHTML = `
    <div>You said:</div>
    <span class="box">${msg}</span>`;
}

// check message aginst number
function checkNumber(msg) {
  const num = +msg;

  //check if valid number
  if (Number.isNaN(num)) {
    msgEL.innerHTML += `<div>That is not a valid number</div>`;
    return;
  }

  // check i number is in range
  if (num < 1 || num > 100) {
    msgEL.innerHTML += `<div>Number must be between 1 and 100</div>`;
    return;
  }

  //check number
  if (num === randomNum) {
    document.body.innerHTML = `
      <h2>Congratulations! You guessed the number <strong>${num}</strong></h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num > randomNum) {
    msgEL.innerHTML += "<div>Go lower</div>";
  } else {
    msgEL.innerHTML += "<div>Go higher</div>";
  }
}

// generate message
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// speak results
regocnition.addEventListener("result", onSpeak);

// end Sr service
regocnition.addEventListener("end", () => regocnition.start());

document.body.addEventListener("click", (e) => {
  if (e.target.id === "play-again") {
    window.location.reload();
  }
});

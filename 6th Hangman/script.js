const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");    
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-parts");

 const  correctLetters = [];
    const wrongLetters = [];

    async function fetchData() {
        const response = await fetch("https://random-word-api.herokuapp.com/word");
        const data = await response.json();
        const word = data;
        
        let selectedWord = word[Math.floor(Math.random() * word.length)];return selectedWord;
    }

    async function init() {
  selectedWord = await fetchData(); // Now selectedWord is set correctly
  displayWord(); // Safe to call now
}


//show the hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(letter => `
        <span class="letter">
          ${correctLetters.includes(letter) ? letter : ''}
        </span>
      `)
      .join('')}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, '')

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won! 😃';
    popup.style.display = 'flex';
  }
  
}

//update the wrong wrongLetters
function updateWrongLettersEl() {
    //display wrong letters
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
    
    //display figure parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
    
        if (index < errors) {
        part.style.display = 'block';
        } else {
        part.style.display = 'none';
        }
    });
    
    //check if lost
    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = "Unfortunately you lost. 😕";
        popup.style.display = 'flex';
    }
}

//show notification
function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// keydown letter press
window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});

//restart game and play again
playAgainBtn.addEventListener('click', async () => {
    //empty arrays
    correctLetters.splice(0)
    wrongLetters.splice(0);    

    selectedWord = await fetchData(); // Fetch a new word
    displayWord();

    updateWrongLettersEl()

    popup.style.display = 'none';
})

init();
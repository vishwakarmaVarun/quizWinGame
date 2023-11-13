const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".gueses-text b");
const keyboard = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgain = document.querySelector(".play-again");

let currentWord, currectLetters, wrongGuessCount;
const maxGuesses = 6;

// reseting all game variables and ui elements
const resetGame = () => {
    currectLetters = [];
    wrongGuessCount = 0;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboard.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    // Selecting a random word and hint from the wordlist
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modatText = isVictory ? `You found the word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats👍' : 'Game Over👎'}`;
        gameModal.querySelector("p").innerHTML = `${modatText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
}

const initGame = (button, clickedLetter) => {
    // checking if clickedletter is exist on the currentword or not
    if(currentWord.includes(clickedLetter)){
        // showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter){
                currectLetters.push(letter); 
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }
    else{
        wrongGuessCount++;
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // calling gameover function if any of these conditions meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(currectLetters.length === currentWord.length) return gameOver(true);
}

// creating the keyboard button and adding event listner
for(let i=97; i<=122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboard.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();

playAgain.addEventListener("click", getRandomWord);
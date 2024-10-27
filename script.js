// Globala variabler
let words = ["Javascript", "Programmering", "Utvecklare", "Vispgrädde", "Stjärna", "Lektion", "Betyg"]; // Ordlista
let selectedWord = ""; 
let hiddenWord = []; 
let shownWord = []; 
let guessedLetters = []; 
let incorrectGuesses = 0; 
const maxGuesses = 6; 

// DOM-element 
const hiddenWordDisplay = document.getElementById("hidden-word");
const guessedLettersDisplay = document.getElementById("guessed-letters");
const letterButtons = document.querySelectorAll('.letter-button');
const resultText = document.getElementById("result-text");
const restartButton = document.getElementById("restart-button");
const hangmanParts = [
    document.getElementById("ground"),
    document.getElementById("scaffold"),
    document.getElementById("head"),
    document.getElementById("body"),
    document.getElementById("arms"),
    document.getElementById("legs")
];

// Starta spelet och välj ett slumpmässigt ord
const startGame = () => {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    hiddenWord = selectedWord.toLowerCase().split(''); 
    shownWord = Array(hiddenWord.length).fill("_"); 
    guessedLetters = []; 
    incorrectGuesses = 0;
    hiddenWordDisplay.textContent = shownWord.join(' ');
    guessedLettersDisplay.textContent = guessedLetters.join(',');
    resultText.textContent = "";
    hangmanParts.forEach(part => part.style.display = "none");
    console.log(`Spelet har startat! Slumpat ord: ${selectedWord}`);
};

// Lägger på eventlisteners för knapparna på skärmen
for (const btn of letterButtons) {
    const chosenLetter = btn.innerText.toLowerCase();

    btn.addEventListener('click', (event) => {
        handleGuess(chosenLetter);
        event.target.classList.add('guessed'); 
        event.target.disabled = true;
    });
}

// Tangentbordsinmatning för bokstäver
document.addEventListener('keydown', (event) => {
    const chosenLetter = event.key.toLowerCase();
    const alphabet = 'abcdefghijklmnopqrstuvwxyzåäö';

    if (alphabet.includes(chosenLetter) && !guessedLetters.includes(chosenLetter)) {
        handleGuess(chosenLetter);

        // Inaktivera motsvarande knapp om den finns på skärmen
        for (const button of letterButtons) {
            if (button.innerText.toLowerCase() === chosenLetter) {
                button.classList.add('guessed');
                button.disabled = true;
            }
        }
    }
});

// Funktion för att hantera gissningar
function handleGuess(letter) {
    console.log(`Du gissade bokstaven: ${letter}`);
    let correctGuess = false;

    guessedLetters.push(letter);

    // Kontrollera om gissningen är rätt eller fel
    for (let i = 0; i < hiddenWord.length; i++) {
        if (letter === hiddenWord[i]) {
            correctGuess = true;
            shownWord[i] = letter;
        }
    }

    hiddenWordDisplay.textContent = shownWord.join(' ');
    guessedLettersDisplay.textContent = guessedLetters.join(',');

    if (!correctGuess) {
        incorrectGuesses++;
        if (incorrectGuesses <= maxGuesses) {
            hangmanParts[incorrectGuesses - 1].style.display = "block";
            console.log(`Fel gissning! Totalt antal fel: ${incorrectGuesses}`);
        }

        if (incorrectGuesses === maxGuesses) {
            resultText.textContent = "Du förlorade!";
            disableAllButtons();
        }
    } else if (!shownWord.includes('_')) {
        resultText.textContent = "Grattis, du vann!";
        disableAllButtons();
    }
}

// Funktion för att inaktivera alla knappar när spelet är slut
function disableAllButtons() {
    letterButtons.forEach(button => {
        button.classList.add('guessed');
        button.disabled = true;
    });
}

// Starta spelet
startGame();


// Globala variablers
let words = ["Javascript", "Programmering", "Utvecklare", "Vispgrädde", "Stjärna", "Lektion", "Betyg"]; 
let selectedWord = ""; 
let hiddenWord = []; 
let shownWord = []; 
let guessedLetters = []; 
let incorrectGuesses = 0; 
const maxGuesses = 7; 

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

// Logga DOM-element för att kontrollera om något är null
console.log("hiddenWordDisplay:", hiddenWordDisplay);
console.log("guessedLettersDisplay:", guessedLettersDisplay);
console.log("letterButtons:", letterButtons);
console.log("resultText:", resultText);
console.log("restartButton:", restartButton);
hangmanParts.forEach((part, index) => console.log(`hangmanPart ${index}:`, part));

// Starta spelet och välj ett slumpmässigt ord
const startGame = () => {
    selectedWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
    hiddenWord = selectedWord.split(''); 
    shownWord = Array(hiddenWord.length).fill("_"); 
    guessedLetters = []; 
    incorrectGuesses = 0;
    
    if (hiddenWordDisplay && guessedLettersDisplay && resultText) {
        hiddenWordDisplay.textContent = shownWord.join(' ');
        guessedLettersDisplay.textContent = guessedLetters.join(',');
        resultText.textContent = "";
        hangmanParts.forEach(part => part.style.display = "none");
        console.log(`Spelet har startat! Slumpat ord: ${selectedWord}`);
    } else {
        console.error("Ett eller flera DOM-element saknas och kan inte uppdateras.");
    }
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

    if (hiddenWordDisplay && guessedLettersDisplay) {
        hiddenWordDisplay.textContent = shownWord.join(' ');
        guessedLettersDisplay.textContent = guessedLetters.join(',');
    }

    if (!correctGuess) {
        incorrectGuesses++;
        console.log(`Fel gissning! Totalt antal fel: ${incorrectGuesses}`);
        
        if (incorrectGuesses <= maxGuesses) {
            hangmanParts[incorrectGuesses - 1].style.display = "block";
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


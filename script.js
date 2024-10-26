// Globala variabler
let words = ["javascript", "programmering", "utvecklare", "vispgrädde", "stjärna", "lektion", "betyg"]; // Ordlista
let selectedWord = ""; // Det ord som slumpas för den aktuella omgången
let hiddenWord = []; 
let guessedLetters = []; 
let incorrectGuesses = 0; // Räknare för felaktiga gissningar
const maxGuesses =  // skriva in antal maximalt antal tillåtna fel

// DOM-element
const hiddenWordDisplay = document.getElementById("hidden-word");
const guessedLettersDisplay = document.getElementById("guessed-letters");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
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

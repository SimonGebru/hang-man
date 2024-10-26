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
const hangmanParts = document.querySelectorAll(".part"); // Om vi ändrar alla olika delar och ger dom class-namn part1, part2, part3 osv så ska dom visas en i taget  


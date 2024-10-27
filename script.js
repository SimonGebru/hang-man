// Globala variabler
let words = ["javascript", "programmering", "utvecklare", "vispgrädde", "stjärna", "lektion", "betyg"]; // Ordlista
let selectedWord = ""; // Det ord som slumpas för den aktuella omgången
let hiddenWord = ['ä', 'p', 'p', 'l', 'e']; 
let shownWord = ['_', '_', '_', '_', '_']; //Börjar som underscores, uppdateras vid rätt gissning
let guessedLetters = []; 
let incorrectGuesses = 0; // Räknare för felaktiga gissningar
const maxGuesses =  6 // skriva in antal maximalt antal tillåtna fel

// DOM-element
const hiddenWordDisplay = document.getElementById("hidden-word");
const guessedLettersDisplay = document.getElementById("guessed-letters");
const letterButtons = document.querySelectorAll('.letter-button');
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


//Lägger på eventlisteners för alla bokstavsknappar
for (const btn of letterButtons) {

    //Hämtar knappens bokstav och gör om den till liten bokstav
    const chosenLetter = btn.innerText.toLowerCase()

    btn.addEventListener('click', () => {

        handleGuess(chosenLetter) 

        btn.setAttribute('disabled', 'true') //Stänger av knappen som just tryckts
    })
}

//Array med alla alfabetets bokstäver
document.addEventListener('keypress', (event) => {
    //Hämtar vilken tangent som trycks
    const chosenLetter = event.key 
    
    //Array med hela alfabetet för att kunna kolla om tangenten är en bokstav
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'å', 'ä', 'ö']

    //Kollar först att tangenten är en bokstav, sedan att bokstaven i fråga inte redan gissats
    if (alphabet.includes(chosenLetter) && !guessedLetters.includes(chosenLetter)) { 
        
        handleGuess(chosenLetter)

        //Stänger av den knapp som motsvarar ens gissning genom att gå igenom alla knappar
        for (const button of letterButtons) { 

            //Hämtar bokstav från knappen och gör om till liten
            const btnLetter = button.innerText.toLowerCase() 

            //Stänger av knappen om dess bokstav matchar ens gissning
            if(chosenLetter == btnLetter) { 
                button.setAttribute('disabled', 'true') 
            }
        }
    }
})

function handleGuess(letter) {
    //Sätter att man gissat fel som default
    let correctGuess = false

    //Lägger till gissningen i historiken
    guessedLetters.push(letter)

    //Jämför gissningen med alla bokstäver i hiddenWord
    for (let i = 0; i < hiddenWord.length; i++) { //Itererar med index för att komma åt både hiddenWord och shownWord

        if (letter == hiddenWord[i]) {

            //Förhindrar fel-gissnings-kod från att köras
            correctGuess = true
            
            //Uppdaterar ordet som ska visas 
            shownWord[i] = letter
        }
        
    }

    if (correctGuess == false) {
        
        //TODO: Anropa funktion som uppdaterar gubben

        //inkrementerar incorrectGuesses och ser om man nått förlust
        incorrectGuesses++
        if (incorrectGuesses == maxGuesses) {
            
            //TODO: Anropa funktion vid förlust

        }
    }
}
//Globala Variabler
let words = ["Javascript", "Programmering", "Utvecklare", "Vispgrädde", "Stjärna", "Lektion", "Betyg", "Ost", "Tomten", "Hörlurar"]; 
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



//Lägger på eventlisteners för alla bokstavsknappar
for (const btn of letterButtons) {
    const chosenLetter = btn.innerText.toLowerCase();

    btn.addEventListener('click', (event) => {
        handleGuess(chosenLetter);
        event.target.classList.add('guessed'); 
        event.target.disabled = true;
    });
}


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



// Eventlistener till bokstaverna TODO


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

        // Kolla om man förlorat
        if (incorrectGuesses === maxGuesses) {
            resultText.textContent = "Du förlorade!";
            console.log("You've lost the game"); 
            disableAllButtons();
        }
    } else if (!shownWord.includes('_')) {
        resultText.textContent = "Grattis, du vann!";
        console.log("You've won the game"); 
        disableAllButtons();
    }
}

//Funktioner som visar/döljer vår resultats-modal
function showResultsModal() {
    document.querySelector('.modal').classList.remove('hidden')
}
function hideResultsModal() {
    document.querySelector('.modal').classList.add('hidden')
}

function disableAllButtons() {
    letterButtons.forEach(button => {
        button.classList.add('guessed');
        button.disabled = true;
    });
}
startGame();

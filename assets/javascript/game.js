var computerWords = [
    "beyonce",
    "rihanna",
    "shakira",
    "prince",
    "madonna",
    "selena",
    "cher"
];

var chances = 10;

var remainingGuesses = 0;

var wins = 0;

var guessedLetters = [];

var selectedWord;

var guessingWord = [];

var gameComplete = false;

function reset() {
    remainingGuesses = chances;

    selectedWord = Math.floor(Math.random() * (computerWords.length));

    guessedLetters = [];
    guessingWord = [];


    for (var i = 0; i < computerWords[selectedWord].length; i++) {
        guessingWord.push("_ ");
    };
};

function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;

    var guessingWordText= "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }

    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    document.getElementById("youWin").innerText = "";
    document.getElementById("gameOver").innerText = "";
    document.getElementById("tryAgain").innerText = "";
};

function evaluateGuess(letter) {
    
    var fillingTheGuess = [];

    for (var i = 0; i < computerWords[selectedWord].length; i++) {
        if(computerWords[selectedWord][i] === letter) {
            fillingTheGuess.push(i);
        }
    }

    if (fillingTheGuess.length <= 0) {
        remainingGuesses--;
    } else {
        for(var i = 0; i < fillingTheGuess.length; i++) {
            guessingWord[fillingTheGuess[i]] = letter;
        }
    }
};

function checkWin() {
    if(guessingWord.indexOf("_ ") === -1) {
        document.getElementById("youWin").innerText = "You win!";
        document.getElementById("tryAgain").innerText = "Try Again.";
        wins++;
        gameComplete = true;
    }
};

function checkLoss() {
    if(remainingGuesses <= 0) {
        document.getElementById("gameOver").innerText = "GAME OVER";
        document.getElementById("tryAgain").innerText = "Try again.";
        gameComplete = true;
    }
};

function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
};

document.onkeydown = function(event) {
    if(gameComplete) {
        reset();
        updateDisplay();
        gameComplete = false;
    } else {
        if(event.keyCode >=65 * event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};
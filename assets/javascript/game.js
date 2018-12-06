// Word List
var stadiumNames = ["YANKEES", "REDSOX", "BLUEJAYS", "ORIOLES", "RAYS", "TIGERS", "INDIANS", "ROYALS", "ANGELS", "ATHLETICS", "RANGERS", "ASTROS", "MARINERS", "TWINS", "GIANTS", "DODGERS", "PADRES", "ROCKIES", "DIAMONDBACKS", "BREWERS", "CUBS", "WHITESOX", "CARDINALS", "REDS", "BRAVES", "MARLINS", "NATIONALS", "PHILLIES", "METS", "PIRATES"];

// Variables
var maxTries = 7;
var guessedLetters = [];
var currentWordIndex;
var guessingWord = [];
var remainingGuesses = 0;
var hasFinished = false;
var wins = 0;
var loses = 0;

// Game sounds
var winSound = new Audio('./assets/sounds/cheering.wav');
var loseSound = new Audio('./assets/sounds/youre-out.wav');
var strikeSound = new Audio('./assets/sounds/strike.wav');

// Event listener
document.onkeyup = function (event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        makeGuess(event.key.toUpperCase());
        updateDisplay();
        checkWin();
        checkLoss();
    }
    else {
        if (hasFinished) {
            resetGame();
            hasFinished = false;
        }
    }
};

// Makes a guess
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
};

// Takes a letter and replaces them in the guess word.
function evaluateGuess(letter) {
    var positions = [];
    for (var i = 0; i < stadiumNames[currentWordIndex].length; i++) {
        if (stadiumNames[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }
    if (positions.length <= 0) {
        remainingGuesses--;
        updateHangmanImage();
        strikeSound.play();
    } else {
        for (var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

// Checks for a win
function checkWin() {
    if (guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        wins++;
        winSound.play();
        hasFinished = true;
    }
};

// Checks for a loss
function checkLoss() {
    if (remainingGuesses <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        loses++;
        loseSound.play();
        hasFinished = true;
    }
};

// Updates the image depending on how many guesses
function updateHangmanImage() {
    document.getElementById("hangmanImage").src = "assets/images/" + (maxTries - remainingGuesses) + ".png";
};

//  Updates the display
function updateDisplay() {
    document.getElementById("totalWins").innerText = wins;
    document.getElementById("totalLoses").innerText = loses;
    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
};

// Reset game-level variables
function resetGame() {
    remainingGuesses = maxTries;
    currentWordIndex = Math.floor(Math.random() * (stadiumNames.length));
    guessedLetters = [];
    guessingWord = [];
    document.getElementById("hangmanImage").src = "";
    for (var i = 0; i < stadiumNames[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }
    document.getElementById("pressKeyTryAgain").style.cssText = "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";
    updateDisplay();
};
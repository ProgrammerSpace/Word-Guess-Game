//Global variables
var w = 0, l = 0;
var won = document.getElementById("winningSound");
var gameOver = document.getElementById("gameOverSound");
var wordList = ['india', 'italy', 'japan', 'korea', 'sweden', 'spain', 'thailand', 'usa', 'vietnam', 'australia', 'brazil', 'belgium', 'china', 'cuba', 'canada', 'denmark', 'egypt', 'france'];
var guessL = [];
var possible = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var end, trii, whatToDisplay, poss;
var newWordFlag = true;

//Reset for a new game
function newGame() {
    var w = wordList[Math.floor(Math.random() * wordList.length)];
    end = false;
    trii = 10;
    guessL = [];
    tries.textContent = "Remaining Tries:" + trii;
    whatToDisplay = [];
    actualWord.textContent = "";
    res.textContent = ("Keep playing!!");
    for (let i = 0; i < w.length; i++) {
        whatToDisplay[i] = false;
    }
    return w;
}

//Update field
function updateField(input) {
    if (!guessL.includes(input)) {
        for (let j = 0; j < word.length; j++) {
            if (input == word[j]) {
                whatToDisplay[j] = true;
            }
        }
        guessL.push(input);
        trii -= 1;
    }
}

function newFieldStr() {
    let tmp = "";
    for (var k = 0; k < word.length; k++) {
        if (whatToDisplay[k]) {
            tmp += word[k];
        } else {
            tmp += ' _';
        }
    }
    return tmp;
}

//User won
function winwin() {
    res.textContent = ("You win !! Hit enter to continue");
    won.play();
    w++;
    newWordFlag = true;
    end = true;
}

//User lost
function gOver() {
    gameOver.play();
    l++;
    newWordFlag = true;
    res.textContent = ("You failed :(");
    actualWord.textContent = ("Anwer is " + word);
    end = true;
}

//Action Listener
document.onkeyup = function (event) {
    if (newWordFlag) {
        word = newGame();
        newWordFlag = false;
    }
    if (!end) {
        var userInput = event.key;
        userInput = userInput.toLowerCase();
        if (possible.includes(userInput)) {
            updateField(userInput);
        }
        var newField = newFieldStr();
        field.textContent = newField;
        document.getElementById("hint").src = "assets/images/" + word + ".jpg";
        document.getElementById("guessed").innerText = "Guessed letters: " + guessL;
        document.getElementById("tries").innerText = "Remaining Tries: " + trii;
        // guessed.textContent = "Guessed letters: " + guessL;
        // tries.textContent = "Remaining Tries: " + trii;
        if ((trii < 1) && (whatToDisplay.includes(false))) {
            gOver();
        } else if (!whatToDisplay.includes(false)) {
            winwin();
        }
        win.textContent = "Wins: " + w;
        los.textContent = "Loses: " + l;
    }
}
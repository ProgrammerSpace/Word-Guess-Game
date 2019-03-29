//Global variables
var w = 0, l = 0;
var guessL = [];
var possible = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var end, trii, whatToDisplay, poss;
var newWordFlag = true;
//Object for word list
var wordList = {
    name: ['india', 'italy', 'japan', 'korea', 'sweden', 'spain', 'thailand', 'usa', 'vietnam', 'australia', 'brazil', 'belgium', 'china', 'cuba', 'canada', 'denmark', 'egypt', 'france'],
    used: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
};

//audio
var won = document.getElementById("winningSound");
var gameOver = document.getElementById("gameOverSound");

//Reset for a new word
function newGame() {
    var w, findWord = true;
    do {
        let checkIndex = Math.floor(Math.random() * wordList.name.length);
        if (wordList.used[checkIndex]) {
            w = wordList.name[checkIndex];
            wordList.used[checkIndex] = false;
            findWord = false;
        } else if (!wordList.used.includes(true)) {
            for (let j = 0; j < wordList.used.length; j++) {
                wordList.used[j] = true;
            }
        }
    } while (findWord);
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
function update(input, guessListPush) {
    if (guessListPush) {
        if (!guessL.includes(input)) {
            for (let j = 0; j < word.length; j++) {
                if (input == word[j]) {
                    whatToDisplay[j] = true;
                    guessListPush = false;
                }
            }
            if (guessListPush) {
                guessL.push(input);
                trii -= 1;
            }
        }
    }
}

//Update field string
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
    res.textContent = ("You got it !! Hit any key to continue");
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
    console.log(event.key);
    var psh = true;
    if (newWordFlag) {
        word = newGame();
        newWordFlag = false;
        psh = false;
    }
    if (!end) {
        var userInput = event.key;
        userInput = userInput.toLowerCase();
        if (possible.includes(userInput)) {
            update(userInput, psh);
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
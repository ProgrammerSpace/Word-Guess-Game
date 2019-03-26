var w = 0, l = 0;
var won = document.getElementById("winningSound");
var gameOver = document.getElementById("gameOverSound");
var words = ['india', 'italy', 'japan', 'korea', 'sweden', 'spain', 'thailand', 'usa', 'vietnam', 'australia', 'brazil', 'belgium', 'china', 'cuba', 'canada', 'denmark', 'egypt', 'france'];
var guessL = [];
var possible = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var word = words[Math.floor(Math.random() * words.length)];
console.log("Got the word: " + word);
var end = false;
var trii = 10;
tries.textContent = "Remaining Tries:" + trii;
whatToDisplay = [];
for (var i = 0; i < word.length; i++) {
    whatToDisplay[i] = false;
}
document.onkeyup = function (event) {
    if (!end) {
        var userInput = event.key;
        if (possible.includes(userInput)) {
            if (!guessL.includes(event.key)) {
                for (var j = 0; j < word.length; j++) {
                    if (userInput == word[j]) {
                        whatToDisplay[j] = true;
                    }
                }
                guessL.push(event.key);
                trii -= 1;
            }
        }
        var tmp = "";
        for (var k = 0; k < word.length; k++) {
            if (whatToDisplay[k]) {
                tmp += word[k];
            } else {
                tmp += ' _';
            }
        }
        field.textContent = tmp;
        guessed.textContent = "Guessed letters: " + guessL;
        tries.textContent = "Remaining Tries:" + trii;
        if ((trii < 1) && (whatToDisplay.includes(false))) {
            res.textContent = ("Game Over!!");
            gameOver.play();
            l++;
            actualWord.textContent = ("Actual word is " + word);
            end = true;
        } else if (!whatToDisplay.includes(false)) {
            res.textContent = ("You win !!");
            won.play();
            w++;
            end = true;
        }
        win.textContent = "Wins:" + w;
        los.textContent = "Loses:" + l;
    }
}
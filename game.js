//Computer select randomly
function computerPlay() {
    let x = Math.floor(Math.random() * 3);

    switch(x) {
        case 0:
            return "paper";
            break;
        case 1:
            return "rock";
            break;
        case 2:
            return "scissors"
            break;
    }
}

//Evaluate player choice and computer choice
function playRound(playerChoice, computerChoice) {
    if (playerChoice == "paper") {
        if (computerChoice == "paper") {
            return {
                result: "It's a draw",
                score: 0
            }
        } else if (computerChoice == "rock") {
            return {
                result: "You win! Paper beats rock.",
                score: 1
            }
        } else if (computerChoice == "scissors") {
            return {
                result: "You lose! Paper was beaten by scissors.",
                score: -1
            }
        }
    } else if (playerChoice == "rock") {
        if (computerChoice == "paper") {
            return {
                result: "You lose! Rock was beaten by paper.",
                score: -1
            }
        } else if (computerChoice == "rock") {
            return {
                result: "It's a draw!",
                score: 0
            }
        } else if (computerChoice == "scissors") {
            return {
                result: "You win! Rock beats scissors.",
                score: 1
            }
        }
    } else if (playerChoice == "scissors") {
        if (computerChoice == "paper") {
            return {
                result: "You win! Scissors beat paper.",
                score: 1
            }
        } else if (computerChoice == "rock") {
            return {
                result: "You lose! Paper was beaten by rock.",
                score: -1
            }
        } else if (computerChoice == "scissors") {
            return {
                result: "It's a draw!",
                score: 0
            }
        }
    }
}

//get and validate choice from user
function getInput() {
    let inputStr = prompt("Enter \"Rock\", \"Paper\", or \"Scissors\":");
    let lowerCaseStr = inputStr.toLowerCase();

    while (lowerCaseStr != "rock" && lowerCaseStr != "paper" && lowerCaseStr != "scissors") {
            inputStr = prompt("Wrong choice. Enter \"Rock\", \"Paper\", or \"Scissors\":");
            lowerCaseStr = inputStr.toLowerCase();
    }

    return {
        userInput: lowerCaseStr
    }
}

//run game of 5 rounds and display final match result
function game(){
    let userWin = 0;
    let compWin = 0;

    for (let i = 1; i<6; i++) {
        let receiveInput = getInput();
        let userPlay = receiveInput.userInput;
        let round = playRound(userPlay, computerPlay());
        alert("Round " + i + ": " + round.result);
        if (round.score == 1) {
            userWin++;
        } else if (round.score == -1) {
            compWin++;
        }
    }

    if (userWin > compWin) {
        alert("You win the match!");
    } else if (userWin < compWin) {
        alert("You lose the match!");
    } else {
        alert("It's a draw!");
    }
}

game();

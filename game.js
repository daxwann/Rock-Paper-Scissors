

  var $btnStart = $('#btnStart');
  var $btnReset = $('#btnReset');

  $btnStart.click(function() {
    startGame();
  };

  $btnReset.click(function() {
    resetGame();
  };




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
function evalChoices(playerChoice, computerChoice) {
    if (playerChoice == "paper") {
        if (computerChoice == "paper") {
            return {
                result: "It's a draw",
                score: 0
            };
        } else if (computerChoice == "rock") {
            return {
                result: "Your paper beats rock.",
                score: 1
            };
        } else if (computerChoice == "scissors") {
            return {
                result: "Your paper was beaten by scissors.",
                score: -1
            };
        };
    } else if (playerChoice == "rock") {
        if (computerChoice == "paper") {
            return {
                result: "Your rock was beaten by paper.",
                score: -1
            };
        } else if (computerChoice == "rock") {
            return {
                result: "It's a draw!",
                score: 0
            };
        } else if (computerChoice == "scissors") {
            return {
                result: "Your rock beats scissors.",
                score: 1
            };
        };
    } else if (playerChoice == "scissors") {
        if (computerChoice == "paper") {
            return {
                result: "Your scissors beat paper.",
                score: 1
            };
        } else if (computerChoice == "rock") {
            return {
                result: "Your paper was beaten by rock.",
                score: -1
            };
        } else if (computerChoice == "scissors") {
            return {
                result: "It's a draw!",
                score: 0
            };
        };
    };
};

//get and validate choice from user
function getInput($choice) {
    var inputStr = $choice.attr('value');

    return {
        userInput: inputStr
    };
};

//reset game
function resetGame() {
  var $battleGroundImg = $('#battleGround img');
  var $selectRoundsDisabled = $('#selectRounds');
  var $btnStartDisabled = $('#btnStart');
  var $announcement = $('#announcement');
  $battleGroundImg.find('.d-block').addClass('d-none').removeClass('d-block');
  $announcement.text('Are you ready? Press Start.');
  $selectRoundsDisabled.attr('disabled', false);
  $btnStartDisabled.attr('disabled', false);
}

function playRound($this, roundNum, userWin, compWin) {

  //user input
  var receiveInput = getInput($this);
  var userPlay = receiveInput.userInput;
  //compare user and computer choices
  var referee = evalChoices(userPlay, computerPlay());
  //get and display round result
  var roundResult = referee.result;
  $announcement.text(roundResult);
  //tally score
  if (referee.score == 1) {
    $playerScore.text(userWin++);
  } else if (referee.score == -1) {
    $compScore.text(compWin++);
  }
  //set for next round
  roundNum++;
  $roundDisplay.text(roundNum);

  return {
    roundLast: roundNum,
    userWin: userWin,
    compWin: compWin
  }
};

//run game of selected rounds and display final match result
function startGame() {
    var userWin = 0;
    var compWin = 0;
    var roundNum = 1;
    var roundTotal = $('#roundsGroup').val();
    var $roundDisplay = $('#roundNum');
    var $announcement = $('#announcement');
    var $selectRounds = $('#selectRounds');
    var $btnChoice = $('#choiceSet button');
    var $btnChoiceImg = $('#choiceSet img');
    var $playerScore = $('#playerScore');
    var $compScore = $('#compScore');
    var $btnStart = $('#btnStart');


    $announcement.text('Let\'s go! Pick your move below.');

//disable select rounds menu and start button
    $btnStart.attr('disabled', true);
    $selectRounds.attr('disabled', true);

    $btnChoice.addClass('shake');
    $roundDisplay.text(roundNum);

//iterate rounds through click event
    $btnChoice.click(function() {
      playRound($this, roundNum, roundTotal);
      roundNum = playRound.lastRound;
      userWin = playRound.userWin;
      compWin = playRound.compWin;
    });

//when rounds are done
  if (roundNum > roundTotal) {
    $btnChoice.find('.shake').removeClass('shake');
    $btnChoice.attr('disable', true);
    $btnStart.attr('disabled', false);
    $selectRounds.attr('disabled', false);
    if (userWin > compWin) {
      $announcement.text('You win the match! Press start to try again!');
    } else if (userWin < compWin) {
      $announcement.text('You lose the match! Press start to try again!');
    } else {
      $announcement.text('It\'s a draw!');
    };
  };
};

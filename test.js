var varList = {};
varList.$btnStart = $('#btnStart');
varList.$btnReset = $('#btnReset');

varList.$btnStart.off('click').click(function() {
  startGame();
});

varList.$btnReset.click(function() {
  varList.userWin = 0;
  varList.compWin = 0;
  varList.roundNum = 0;
  varList.$battleGround.find('.d-block').addClass('d-none').removeClass('d-block');
  varList.$announcement.text('Are you ready? Press Start.');
  varList.$selectRounds.attr('disabled', false);
  varList.$btnStart.attr('disabled', false);
  varList.$roundDisplay.text(varList.roundNum);
  varList.$btnChoice.removeClass('shake');
  varList.$playerScore.text(varList.userWin);
  varList.$compScore.text(varList.compWin);
});


//get and validate choice from user
function getInput($this) {
    var inputStr = $this.attr('value');

    return {
        userInput: inputStr
    };
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

//play through each round
function playRound($this) {
  //get user input
  var receiveInput = getInput($this);
  var userChoice = receiveInput.userInput;
  var compChoice = computerPlay();
  var $playerRock = $('#playerRock');
  var $playerPaper = $('#playerPaper');
  var $playerScissors = $('#playerScissors');
  var $compRock = $('#compRock');
  var $compPaper = $('#compPaper');
  var $compScissors = $('#compScissors');
  var $playerSide = $('#playerSide');
  var $compSide = $('#compSide');
  //display user and computer choice
  if (userChoice == 'rock') {
    $playerSide.find('.d-block').addClass('d-none').removeClass('d-block');
    $playerRock.addClass('d-block').removeClass('d-none');
  } else if (userChoice == 'paper') {
    $playerSide.find('.d-block').addClass('d-none').removeClass('d-block');
    $playerPaper.addClass('d-block').removeClass('d-none');
  } else if (userChoice == 'scissors') {
    $playerSide.find('.d-block').addClass('d-none').removeClass('d-block');
    $playerScissors.addClass('d-block').removeClass('d-none');
  };

  if (compChoice == 'rock') {
    $compSide.find('.d-block').addClass('d-none').removeClass('d-block');
    $compRock.addClass('d-block').removeClass('d-none');
  } else if (compChoice == 'paper') {
    $compSide.find('.d-block').addClass('d-none').removeClass('d-block');
    $compPaper.addClass('d-block').removeClass('d-none');
  } else if (compChoice == 'scissors') {
    $compSide.find('.d-block').addClass('d-none').removeClass('d-block');
    $compScissors.addClass('d-block').removeClass('d-none');
  };

  //evaluate player and computer choices
  var referee = evalChoices(userChoice, compChoice);

  //get and display round result
  var roundResult = 'Round ' + varList.roundNum + ': ' + referee.result;
  varList.$announcement.text(roundResult);

  //tally score
  if (referee.score == 1) {
    varList.userWin += 1;
    varList.$playerScore.text(varList.userWin);
  } else if (referee.score == -1) {
    varList.compWin += 1;
    varList.$compScore.text(varList.compWin);
  }

  //increase round
  varList.roundNum += 1;
  if (varList.roundNum<=varList.roundTotal) {
  varList.$roundDisplay.text(varList.roundNum);
  };
};

function startGame() {
  varList.userWin = 0;
  varList.compWin = 0;
  varList.roundNum = 1;
  varList.roundTotal = $('#selectRounds').val();
  varList.$roundDisplay = $('#roundNum');
  varList.$announcement = $('#announcement');
  varList.$selectRounds = $('#selectRounds');
  varList.$btnChoice = $('#choiceSet button');
  varList.$btnChoiceImg = $('#choiceSet img');
  varList.$playerScore = $('#playerScore');
  varList.$compScore = $('#compScore');
  varList.$battleGround = $('#battleGround');

  varList.$announcement.text('Let\'s go! Pick your move below.');

  //disable select rounds menu and start button
  varList.$btnStart.attr('disabled', true);
  varList.$selectRounds.attr('disabled', true);
  varList.$btnChoice.attr('disabled', false);
  varList.$btnChoice.addClass('shake');
  varList.$roundDisplay.text(varList.roundNum);
  varList.$playerScore.text(varList.userWin);
  varList.$compScore.text(varList.compWin);
  varList.$battleGround.find('.d-block').addClass('d-none').removeClass('d-block');

  //iterate rounds through click event
  varList.$btnChoice.off('click').click(function() {

    playRound($(this));

    //when rounds are done
    if ((varList.roundNum > varList.roundTotal) ||
    (varList.userWin == (Math.ceil(varList.roundTotal/2))) ||
    (varList.userWin == (Math.ceil(varList.roundTotal/2)))) {
      varList.$btnChoice.removeClass('shake');
      varList.$btnChoice.attr('disabled', true);
      varList.$btnStart.attr('disabled', false);
      varList.$selectRounds.attr('disabled', false);
      if (varList.userWin > varList.compWin) {
        varList.$announcement.append('<br>You win the match! Press start to try again!');
      } else if (varList.userWin < varList.compWin) {
        varList.$announcement.append('<br>You lose the match! Press start to try again!');
      } else {
        varList.$announcement.append('<br>It\'s a draw!');
      };
    };
  });
};

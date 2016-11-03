// After players are created they get stuffed in here.
var currentPlayers = [];
// Tracks points accumulated during a turn.
var turnPoints = 0;
var twoDicePig = false;
var computerStop = false;
// A constructor for creating player objects.
function Player(playerName) {
  this.name = playerName;
  this.score = 0;
  this.turn = false;
  this.computer = false;
}
// Switches turn to the next player.
function turnSwitcher() {
  for(idx = 0; idx < currentPlayers.length; idx++) {
    if(currentPlayers[idx].turn) {
      $("#list-score" + idx).text(currentPlayers[idx].score);
      currentPlayers[idx].turn = false;

      if(idx === currentPlayers.length-1) {
        currentPlayers[0].turn = true;
        $("#which-player").text(currentPlayers[0].name);
        $("#current-score").text(currentPlayers[0].score);
        break;
      } else {
        currentPlayers[idx+1].turn = true;
        $("#which-player").text(currentPlayers[idx+1].name);
        $("#current-score").text(currentPlayers[idx+1].score);
        break;
      }
    }
  }
}
// Checks if player has rolled a 1.
function rollChecker(roll, roll2) {
  if (roll === 1 && roll2 === 1) {
    $("#rolled-1").hide();
    $(".button-area").hide();
    $("#turn-change").show();
    $("#snake-eyes").show();
    scoreResetter();
    computerStop = true;
  } else if(roll === 1 || roll2 === 1) {
    $("#snake-eyes").hide();
    $(".button-area").hide();
    $("#turn-change").show();
    $("#rolled-1").show();
    computerStop = true;
  } else {
    $("#snake-eyes").hide();
    $("#rolled-1").hide();
  }
}
// Reset player score.
function scoreResetter() {
  for(idx = 0; idx < currentPlayers.length; idx++) {
    if(currentPlayers[idx].turn) {
      currentPlayers[idx].score = 0;
    }
  }
}
// Checks if a player score has reached 100.
function scoreChecker(score) {
  if(score >= 100) {
    $(".score-area").hide();
    $("#list-score" + idx).text(currentPlayers[idx].score);
    $(".winner").show();
    $("#winner-name").text(currentPlayers[idx].name);

    for(idx = 0; idx < currentPlayers.length; idx++) {
      if(currentPlayers[idx].turn) {
        currentPlayers[idx].turn = false;
      }
    }
  }
}

function pointsAndDisplayReset() {
  turnPoints = 0;
  $("#last-roll").text(0);
  $("#turn-points").text(turnPoints);
}

function diceRoller() {
  return Math.floor((Math.random() * 6) + 1);
}
// Functions for rolling one die or two dice.
function rollOne() {
  var roll = diceRoller();
  turnPoints += roll;
  $("#last-roll").text(roll);
  $("#turn-points").text(turnPoints);
  rollChecker(roll);
  $("#computer-rolls").append("<li>Die 1: " + roll + "</li>");
}
function rollTwo() {
  var roll = diceRoller();
  var roll2 = diceRoller();
  turnPoints += (roll + roll2);
  $("#last-roll").text(roll + ", " + roll2);
  $("#turn-points").text(turnPoints);
  rollChecker(roll, roll2);
  $("#computer-rolls").append("<li>Die 1: " + roll + ", Die 2: " + roll2 + "</li>");
}
// Rolls the dice for the computer when playing Two Dice Pig.
function computerMoveTwoDice(loops) {
  for(idx=0; idx < loops; idx++) {
    if(computerStop) {
      console.log("Hit the breaker");
      break;
    } else {
      rollTwo();
    }
  }
  if(computerStop === false) {
    for(idx = 0; idx < currentPlayers.length; idx++) {
      if(currentPlayers[idx].turn) {
        currentPlayers[idx].score += turnPoints;
      }
    }
  }
}
// Rolls the die for the computer when playing with one die.
function computerMoveOneDie(loops) {
  for(idx=0; idx < loops; idx++) {
    if(computerStop) {
      break;
    } else {
      rollOne();
    }
  }
  if(computerStop === false) {
    for(idx = 0; idx < currentPlayers.length; idx++) {
      if(currentPlayers[idx].turn) {
        currentPlayers[idx].score += turnPoints;
      }
    }
  }
}
// The function that runs the AI for computer players.
function computerTurn() {
  console.log("Enter computer turn");
  var ownScore = 0;
  var highScore = 0;
  var playerScores = [];
  computerStop = false;

  for(idx = 0; idx < currentPlayers.length; idx++) {
    playerScores.push(currentPlayers[idx].score);
    console.log("Pushed score: " + currentPlayers[idx].score);
  }

  console.log("playerScores: " + playerScores);

  for(idx = 0; idx < currentPlayers.length; idx++) {
    if(currentPlayers[idx].turn) {
      ownScore = currentPlayers[idx].score;
      playerScores[idx] = 0;
      console.log("Own playerScores: " + playerScores[idx]);
    }
  }
  // Callback function for array.find() method.
  function highestScorer(score) {
    return score < 100;
  }
  highScore = playerScores.find(highestScorer);

  // Loop that ensures highScore is the highest score.
  for(idx = 0; idx < playerScores.length ;idx++) {
    if(highScore < playerScores[idx]) {
      highScore = playerScores[idx];
    }
  }

  var scoreDifference = highScore - ownScore;
  console.log("highest score: " + highScore + ", own score: " + ownScore + ", score difference: " + scoreDifference);

  if(scoreDifference === 0) {
    if(twoDicePig) {
      computerMoveTwoDice(2);
    } else {
      computerMoveOneDie(2);
    }
  } else if(scoreDifference < 0) {
    if(twoDicePig) {
      computerMoveTwoDice(1);
    } else {
      computerMoveOneDie(1);
    }
  } else if(scoreDifference <= 10 && scoreDifference > 0) {
    if(twoDicePig) {
      computerMoveTwoDice(2);
    } else {
      computerMoveOneDie(2);
    }
  } else if(scoreDifference <= 30 && scoreDifference > 0) {
    if(twoDicePig) {
      computerMoveTwoDice(3);
    } else {
      computerMoveOneDie(3);
    }
  } else if(scoreDifference <= 50 && scoreDifference > 0) {
    if(twoDicePig) {
      computerMoveTwoDice(4);
    } else {
      computerMoveOneDie(4);
    }
  } else if(scoreDifference <= 70 && scoreDifference > 0) {
    if(twoDicePig) {
      computerMoveTwoDice(5);
    } else {
      computerMoveOneDie(5);
    }
  } else if(scoreDifference <= 99 && scoreDifference > 0) {
    if(twoDicePig) {
      computerMoveTwoDice(7);
    } else {
      computerMoveOneDie(7);
    }
  }

  $(".button-area").hide();
  $("#turn-change").show();
  $("#computer-ended").show();
  $("#computer-rolls").show();
}
// User Interface below this line.

$(function(){
  var numberOfPlayers = 0;
  var computerCounter = 1;
  // Creates a new player on form submit, adds it to currentPlayers, and increments the index of currentPlayers by 1 after it does so.
  $("form#player-creation").submit(function(event) {
    event.preventDefault();

    var playerName = $("input#player-name").val();

    currentPlayers[numberOfPlayers] = new Player(playerName);
    $("#current-players").append("<li>" + currentPlayers[numberOfPlayers].name + ", Score: <span id=\"list-score" + numberOfPlayers + "\"></span>" + "</li>");
    numberOfPlayers++;
    $("input#player-name").val("");
  });

  $("button#add-computer").click(function() {
    currentPlayers[numberOfPlayers] = new Player("computer" +[computerCounter]);
    currentPlayers[numberOfPlayers].computer = true;
    $("#current-players").append("<li>" + currentPlayers[numberOfPlayers].name + ", Score: <span id=\"list-score" + numberOfPlayers + "\"></span>" + "</li>");
    numberOfPlayers++;
    computerCounter++;
  });

  $("button#done-players").click(function() {
    $("form#player-creation").hide();
    $("#done-players").hide();
    $("#dice-choice").show();
    currentPlayers[0].turn = true;
    $("#which-player").text(currentPlayers[0].name);
    turnPoints = 0;
  });

  $("button#one-die").click(function() {
    $(".score-area").show();
    $("#roll-dice").hide();
    $("#dice-choice").hide();
  });

  $("button#two-dice").click(function() {
    twoDicePig = true;
    $(".score-area").show();
    $("#roll-die").hide();
    $("#dice-choice").hide();
  });

  $("button#roll-die").click(function() {
    // Generates a whole number from 1 to 6.
    rollOne();
    $("#computer-rolls").empty();
  });

  $("button#roll-dice").click(function() {
    // Generates a whole number from 1 to 6.
    rollTwo();
    $("#computer-rolls").empty();
  });

  $("button#turn-change").click(function() {
    // Generates a whole number from 1 to 6.
    $("#snake-eyes").hide();
    $("#rolled-1").hide();
    $("#turn-change").hide();
    $("#computer-ended").hide();
    $("#computer-rolls").hide();
    $("#computer-rolls").empty();
    $(".button-area").show();
    pointsAndDisplayReset();

    for(idx = 0; idx < currentPlayers.length; idx++) {
      if(currentPlayers[idx].turn) {
        scoreChecker(currentPlayers[idx].score);
      }
    }

    turnSwitcher();

    for(idx = 0; idx < currentPlayers.length; idx++) {
      if(currentPlayers[idx].turn) {
        if (currentPlayers[idx].computer) {
          computerTurn();
          break;
        }
      }
    }
  });

  $("button#hold-score").click(function() {
    // For loop that checks whose turn it is and changes it to the next player's turn.
    for(idx = 0; idx < currentPlayers.length; idx++) {
      if(currentPlayers[idx].turn) {
        currentPlayers[idx].score += turnPoints;
        $("#list-score" + idx).text(currentPlayers[idx].score);
        scoreChecker(currentPlayers[idx].score);
      }
    }

    turnSwitcher();
    pointsAndDisplayReset();

    for(idx = 0; idx < currentPlayers.length; idx++) {
      if(currentPlayers[idx].turn) {
        if (currentPlayers[idx].computer) {
          computerTurn();
          break;
        }
      }
    }
  });

  $("button#play-again").click(function() {
    location.reload();
  });
});

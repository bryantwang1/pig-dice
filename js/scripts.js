// After players are created they get stuffed in here.
var currentPlayers = [];
// Tracks points accumulated during a turn.
var turnPoints = 0;
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
    pointsAndDisplayReset();
  } else if(roll === 1 || roll2 === 1) {
    $("#snake-eyes").hide();
    $(".button-area").hide();
    $("#turn-change").show();
    $("#rolled-1").show();
    pointsAndDisplayReset();
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
    $(".winner").show();
    $("#winner-name").text(currentPlayers[idx].name);
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
    $(".score-area").show();
    $("#roll-die").hide();
    $("#dice-choice").hide();
  });

  $("button#roll-die").click(function() {
    // Generates a whole number from 1 to 6.
    var roll = diceRoller();
    turnPoints += roll;
    $("#last-roll").text(roll);
    $("#turn-points").text(turnPoints);
    rollChecker(roll);
  });

  $("button#roll-dice").click(function() {
    // Generates a whole number from 1 to 6.
    var roll = diceRoller();
    var roll2 = diceRoller();
    turnPoints += (roll + roll2);
    $("#last-roll").text(roll + ", " + roll2);
    $("#turn-points").text(turnPoints);
    rollChecker(roll, roll2);
  });

  $("button#turn-change").click(function() {
    // Generates a whole number from 1 to 6.
    turnSwitcher();
    $("#snake-eyes").hide();
    $("#rolled-1").hide();
    $("#turn-change").hide();
    $(".button-area").show();
  });

  $("button#hold-score").click(function() {
    // For loop that checks whose turn it is and changes it to the next player's turn.
    for(idx = 0; idx < currentPlayers.length; idx++) {
      if(currentPlayers[idx].turn) {
        currentPlayers[idx].score += turnPoints;
        $("#list-score" + idx).text(currentPlayers[idx].score);
        currentPlayers[idx].turn = false;
        scoreChecker(currentPlayers[idx].score);

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
    pointsAndDisplayReset();
  });

  $("button#play-again").click(function() {
    location.reload();
  });
});

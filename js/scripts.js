// After players are created they get stuffed in here.
var currentPlayers = [];
// Tracks points accumulated during a turn.
var turnPoints = 0;
// A constructor for creating player objects.
function player(playerName) {
  this.name = playerName;
  this.score = 0;
  this.turn = false;
}
// Checks if player has rolled a 1.
function rollChecker(roll) {
  if(roll === 1) {
    $("#rolled-1").show();
    for(idx = 0; idx < currentPlayers.length; idx++) {
      if(currentPlayers[idx].turn) {
        currentPlayers[idx].turn = false;

        if(idx === currentPlayers.length-1) {
          currentPlayers[0].turn = true;
          $("#which-player").text(currentPlayers[0].name);
          $("#current-score").text(currentPlayers[0].score);
          pointsAndDisplayReset();
          break;
        } else {
          currentPlayers[idx+1].turn = true;
          $("#which-player").text(currentPlayers[idx+1].name);
          $("#current-score").text(currentPlayers[idx+1].score);
          pointsAndDisplayReset();
          break;
        }
      }
    }
    pointsAndDisplayReset();
  } else {
    $("#rolled-1").hide();
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

// User Interface below this line.

$(function(){
  var numberOfPlayers = 0;
  // Creates a new player on form submit, adds it to currentPlayers, and increments the index of currentPlayers by 1 after it does so.
  $("form#player-creation").submit(function(event) {
    event.preventDefault();

    var playerName = $("input#player-name").val();

    currentPlayers[numberOfPlayers] = new player(playerName);
    $("#current-players").append("<li>" + currentPlayers[numberOfPlayers].name + ", Score: <span id=\"list-score" + numberOfPlayers + "\"></span>" + "</li>");
    numberOfPlayers++;
    $("input#player-name").val("");
  });

  $("button#done-players").click(function() {
    $("form#player-creation").hide();
    $("#done-players").hide();
    $(".score-area").show();
    currentPlayers[0].turn = true;
    $("#which-player").text(currentPlayers[0].name);
    turnPoints = 0;
  });
  // Tracks points accumulated over a single turn.

  $("button#roll-dice").click(function() {
    // Generates a whole number from 1 to 6.
    var roll = Math.floor((Math.random() * 6) + 1);
    turnPoints += roll;
    $("#last-roll").text(roll);
    $("#turn-points").text(turnPoints);
    rollChecker(roll);
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
          pointsAndDisplayReset();
          $("#which-player").text(currentPlayers[0].name);
          $("#current-score").text(currentPlayers[0].score);
          break;
        } else {
          currentPlayers[idx+1].turn = true;
          pointsAndDisplayReset();
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

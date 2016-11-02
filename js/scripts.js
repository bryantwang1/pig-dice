// After players are created they get stuffed in here.
var currentPlayers = [];
// A constructor for creating player objects.
function player(playerName) {
  this.name = playerName;
  this.score = 0;
  this.turn = false;
}

// User Interface below this line.

$(function(){
  var numberOfPlayers = 0;
  // Creates a new player on form submit, adds it to currentPlayers, and increments the index of currentPlayers by 1 after it does so.
  $("form#player-creation").submit(function(event) {
    event.preventDefault();

    var playerName = $("input#player-name").val();

    currentPlayers[numberOfPlayers] = new player(playerName);
    numberOfPlayers++;
  });

  $("button#done-players").click(function() {
    $("form#player-creation").hide();
    $("#done-players").hide();
    currentPlayers[0].turn = true;
    $("#which-player").text(currentPlayers[0].name);
  });

  $("button#roll-dice").click(function() {
    // Generates a whole number from 1 to 6.
    var roll = Math.floor((Math.random() * 6) + 1);
    $("#last-roll").text(roll);
  });

  $("button#hold-score").click(function() {
    for(idx = 0; idx < currentPlayers.length; idx++) {
      if(currentPlayers[idx].turn) {
        currentPlayers[idx].turn = false;

        if(idx === currentPlayers.length-1) {
          currentPlayers[0].turn = true;
          break;
        } else {
          currentPlayers[idx+1].turn = true;
          break;
        }
      }
    }
  });

});

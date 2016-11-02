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
    currentPlayers[0].turn = true;
  });

  $("button#done-players").click(function() {
    $("form#player-creation").hide();
    $("#done-players").hide();
  });

  $("button#roll-dice").click(function() {
    // Generates a whole number from 1 to 6.
     var roll = Math.floor((Math.random() * 6) + 1);
      $("#last-roll").text(roll);
  });

});

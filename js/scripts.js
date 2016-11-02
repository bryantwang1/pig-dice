var currentPlayers = [];

function player(playerName) {
  this.name = playerName;
  this.score = 0;
}

$(function(){
  var numberOfPlayers = 0;

  $("form#player-creation").submit(function(event) {
    event.preventDefault();
    
    var playerName = $("input#player-name").val();

    currentPlayers[numberOfPlayers] = new player(playerName);
    numberOfPlayers++;
  });

   var result = Math.floor((Math.random() * 6) + 1);

   $("#current-score").text(result);
});

function player(playerName) {
  this.name = playerName;
  this.score = 0;
}

$(function(){
   var result = Math.floor((Math.random() * 6) + 1);

   $("#current-score").text(result);
});

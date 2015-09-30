(function(){
  'use strict';
  var http = require('http');
  var fs = require('fs');

  var PlayersFile = fs.readFileSync('field.json');
  var PlayersJson = JSON.parse(PlayersFile);
  var Players = PlayersJson.Tournament.Players;

  var something = [];
  Players.forEach(function(x){
    var id = x.TournamentPlayerId;
    var links = 'http://www.pgatour.com/data/r/060/scorecards/'+id+'.json';
    something.push(id);
    var file = fs.createWriteStream('players/'+id+'.json');
    var request = http.get(links, function(response){
      response.pipe(file);
    });
  });
  console.log(something.length);
})();

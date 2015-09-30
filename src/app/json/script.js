(function(){
  'use strict';
  var fs = require('fs');
  var http = require('http');
  var Firebase = require('firebase');
  var fbase = new Firebase('https://reditclone.firebaseio.com/leaderboard');

  var TournamentPlayersObj = fs.readFileSync('field.json');
  var TournamentPlayers = JSON.parse(TournamentPlayersObj);
  var Players = TournamentPlayers.Tournament.Players;

  var TournamentCourse = fs.readFileSync('course.json');
  var Courses = JSON.parse(TournamentCourse);
  var Course = Courses.courses;

  var FieldObj = [];
  var CourseObj = [];

  // Getting the players and ids out
  Players.forEach(function(a){
    var id = a.TournamentPlayerId;
    var parts = a.PlayerName.split(', ');
    var Name = parts[1]+' '+parts[0];
    FieldObj.push({
      Name:Name,
      Id:id
    });
  });

  // Getting the course stats
  Course.forEach(function(b){
    var holes = b.holes;
    holes.forEach(function(c){
      var holeNumber = c.number;
      var par = c.parValue;
      CourseObj.push({
        HoleNumber:holeNumber,
        Par:par
      });
    });
  });
  var PlayerStats = [];

  FieldObj.forEach(function(d){
    var id = d.Id;
    var Name = d.Name;
    var PlayerLinks = 'players/'+id+'.json';
    var PlayerRead = fs.readFileSync(PlayerLinks);
    var PlayerJson = JSON.parse(PlayerRead);
    var PlayerJsonId = PlayerJson.p.id;
    if(id === PlayerJsonId){
      var PlayerRounds = PlayerJson.p.rnds;
      PlayerRounds.forEach(function(e){
        var holesObj = e.holes;
        var Points = 0;
        holesObj.forEach(function(f){
          var PlayerHoleNumber = f.cNum;
          var Score = f.sc;
          CourseObj.forEach(function(g){
            var HoleNumber = g.HoleNumber;
            var Par = g.Par;
            if(HoleNumber === PlayerHoleNumber){
              var total = Par - Score;
              if(Score === ''){
                total = 0;
              }
              if(total === 0){
                Points = Points;
              }else if(total === 1){
                Points = Points + 2;
              }else if(total >= 2){
                Points = Points + 4;
              }else if(total === -1){
                Points = Points -1;
              }else if(total <= -2){
                Points = Points -2;
              }
            }
          });
        });
        PlayerStats.push({
          Name:Name,
          Points:Points
        });

      });
    }
  });
  var newArr = [];
  var types = {};
  var i = 0;
  var j;
  var cur;

  for(j = PlayerStats.length; i<j; i++){
    cur = PlayerStats[i];
    if(!(cur.Name in types)){
      types[cur.Name] = {Name: cur.Name, Points:[]};
      newArr.push(types[cur.Name]);
    }
    types[cur.Name].Points.push(cur.Points);
  }

  var final = [];
  for (var h = 0; h<newArr.length; h++){
    var total = 0;
    var name = newArr[h].Name;
    var points = newArr[h].Points;
    for(var k = 0; k<points.length; k++){
      total += points[k];
    }
    final.push({
      Name:name,
      Points:points,
      Total:total
    });
    final.sort(function(a,b){
      return b.Total - a.Total;
    });
  }
  fbase.set(final);
  console.log(final);
})();

(function(){
  'use strict';
  angular
  .module('thatOneThing')
  .controller('StandingsController', StandingsController);

  function StandingsController(FirebaseUrl, $firebaseArray, $firebaseObject){
    var vm = this;
    var ref = new Firebase(FirebaseUrl);
    init();
    function init(){
      var leaderboard = $firebaseArray(ref.child('leaderboard'));
      vm.leaderboard = leaderboard;
      leaderboard.$loaded().then(function(data){
        data.forEach(function(x){
          //console.log(x.Name);
        });
      });
      var userTeam = $firebaseObject(ref.child('userTeam'));
      userTeam.$loaded().then(function(data){
        data.forEach(function(a){
          var name = a.name;
          var team = a.Team;

          var teamPlayers = $firebaseObject(ref.child('userTeam').child(name).child('Team'));
          teamPlayers.$loaded().then(function(ddata){
            console.log(name);
            ddata.forEach(function(x){
              console.log(x.name);
            });
          });
        });
      });

    }
  }
})();

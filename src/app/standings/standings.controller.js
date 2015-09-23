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
      var teams = $firebaseObject(ref.child('userTeam'));
      teams.$loaded().then(function(data){
        data.forEach(function(j){
          var team = j.Team;
          console.log(team);
        });
      });
      vm.leaderboard = leaderboard;
      leaderboard.$loaded().then(function(data){
        data.forEach(function(x){
          //console.log(x.Name);
        });
      });

    }
  }
})();

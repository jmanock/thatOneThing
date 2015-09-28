(function(){
  'use strict';
  angular
  .module('thatOneThing')

  .controller('StandingsController', StandingsController);

  function StandingsController($scope, FirebaseUrl, $firebaseArray, $firebaseObject){
    var vm = this;
    var fireRef = new Firebase('https://reditclone.firebaseio.com/userTeam/');
    var players = [];
    init();
    function init(){

      vm.teams = $firebaseArray(fireRef);
      var ref = new Firebase('https://reditclone.firebaseio.com/leaderboard/');
      var something = $firebaseArray(ref);
      something.$loaded().then(function(data){
        angular.forEach(data, function(x){
          players.push(x);
        });
      });
      vm.leaderboard = something;
    }
    vm.getTotalPoints = function(x){
      var total = 0;
      var team = x.Team;
      angular.forEach(team, function(z){
        var name = z.Name;
        angular.forEach(players, function(a){
          if(a.Name === name){
            total += a.Total;
          }
        });

      });
      return total;
    };

    vm.getPlayerPoints = function(x){
      var total = 0;
      angular.forEach(players, function(a){
        if(a.Name === x){
          total = a.Total;
        }
      });
      return total;
    };
  }
})();

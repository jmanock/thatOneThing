(function(){
  'use strict';
  angular
  .module('thatOneThing')

  .controller('StandingsController', StandingsController);

  function StandingsController($scope, FirebaseUrl, $firebaseArray, $firebaseObject){
    var vm = this;
    var fireRef = new Firebase('https://reditclone.firebaseio.com/userTeam/');
    // $scope.todos = $firebaseArray(fireRef);
    // $scope.newTodo = '';
    // $scope.addTodo = function(){
    //   var newTodo = $scope.newTodo.trim();
    //   if(!newTodo.length){
    //     return;
    //   }
    //     $scope.todos.$add({
    //       title:newTodo,
    //       completed:false
    //     });
    //     $scope.newTodo = '';
    // };
    // $scope.removeTodo = function(todo){
    //   $scope.todos.$remove(todo);
    // };
    var players = [];
    init();
    function init(){

      $scope.teams = $firebaseArray(fireRef);
      var ref = new Firebase('https://reditclone.firebaseio.com/leaderboard/');
      var something = $firebaseArray(ref);
      something.$loaded().then(function(data){
        angular.forEach(data, function(x){
          players.push(x);
        });
      });
      $scope.leaderboard = something;
    }
    $scope.getTotalPoints = function(x){
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

    $scope.getPlayerPoints = function(x){
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

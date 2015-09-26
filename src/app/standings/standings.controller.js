(function(){
  'use strict';
  angular
  .module('thatOneThing')
  .filter('something', something)
  .controller('StandingsController', StandingsController);

  function something($firebaseArray){
    return function(input){
      var ssomething = [];
      var knew = [];
      angular.forEach(input, function(x){
        ssomething.push(x.Name);
      });
      var ref = new Firebase('https://reditclone.firebaseio.com/leaderboard');
      var fRef = $firebaseArray(ref);
      fRef.$loaded().then(function(data){
        data.forEach(function(a){
          var kname = a.Name;
          ssomething.forEach(function(b){
            if(b === kname){
              knew.push({
                Name:b,
                Points:a.Total
              });
            }
          });
          
        });

      });

    };
  }
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
    init();
    function init(){
      $scope.teams = $firebaseArray(fireRef);

    }

  }
})();

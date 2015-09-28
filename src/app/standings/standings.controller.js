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
    init();
    function init(){
      $scope.teams = $firebaseArray(fireRef);

    }
    $scope.getStuff = function(x){
      var team = x.Team;
      angular.forEach(team, function(z){
        var name = z.Name;
        console.log(name);
      });
    };
  }
})();

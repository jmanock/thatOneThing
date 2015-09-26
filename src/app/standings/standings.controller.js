(function(){
  'use strict';
  angular
  .module('thatOneThing')
  .filter('something', something)
  .controller('StandingsController', StandingsController);

  function something(){
    return function(input){
      console.log(input);
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

(function(){
  'use strict';
  angular
  .module('thatOneThing')
  .controller('StandingsController', StandingsController);

  function StandingsController($scope, FirebaseUrl, $firebaseArray, $firebaseObject){
    var vm = this;
    var fireRef = new Firebase('https://reditclone.firebaseio.com/leaderboard/');
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
      var ref = new Firebase('https://reditclone.firebaseio.com/testTeam');

    }
    vm.leaderboard = $firebaseArray(fireRef);
    vm.leaderboard.$loaded().then(function(data){
      data.forEach(function(x){
        //console.log(x);
      });
    });
    vm.add = function(x){
      var name = 'jon';
      var ref = new Firebase('https://reditclone.firebaseio.com/');
      
    };
  }
})();

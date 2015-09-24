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
      var ref = new Firebase('https://reditclone.firebaseio.com/');
      var something = $firebaseArray(ref.child('testTeam'));
      var somethingElse = $firebaseArray(ref.child('testUserTeam'));
      somethingElse.$loaded().then(function(ddata){
        ddata.forEach(function(A){
          var name = A.Name;
          var player = A.Player;
          something.$loaded().then(function(data){
            data.forEach(function(x){
              var Id = x.$id;
              if(name === Id){
                console.log(name,player);
              }
            });
          });
        });
      });

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
      vm.testTeam = $firebaseArray(ref.child('testTeam').child(name));
      vm.testUserTeam = $firebaseArray(ref.child('testUserTeam'));
      vm.testUserTeam.$add({
        Name:name,
        Player:x.Name
      });
      vm.testTeam.$add({
        Name:x.Name
      });
    };
  }
})();

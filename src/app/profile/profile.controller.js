(function(){
  'use strict';
  angular
  .module('thatOneThing')
  .controller('ProfileController', ProfileController);

  function ProfileController($http, $stateParams, $firebaseArray, FirebaseUrl){
    var vm = this;
    // vm.currentUser = $firebaseArray(FirebaseUrl.child('user').child($stateParams.id));
    // console.log(vm.currentUser);

    var players = [];
    $http.get('app/field.json').success(function(data){
      var tPlayers = data.Tournament.Players;
      tPlayers.forEach(function(x){
        var names = x.PlayerName;
        var parts = names.split(', ');
        var fieldNames = parts[1]+' '+parts[0];
        players.push({
          Name:fieldNames
        });
        vm.field = players;
      });
    });
  }
})();

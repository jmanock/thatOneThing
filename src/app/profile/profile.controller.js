(function(){
  'use strict';
  angular
  .module('thatOneThing')
  .controller('ProfileController', ProfileController);

  function ProfileController($http, $stateParams, $firebaseArray, FirebaseUrl){
    var vm = this;
    /* TODO:
      ~ Set up current user
        * pass in the user data
        * add buttons
        * remove buttons
        * split into a b c players
        * set up rules
        * split views for all players list
        * show team
    */


    var players = [];
    $http.get('app/json/field.json').success(function(data){
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

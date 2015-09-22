(function(){
  'use strict';
  angular
  .module('thatOneThing')
  .controller('ProfileController', ProfileController);


  function ProfileController($http, Auth, $stateParams, FirebaseUrl, $firebaseObject){
    var vm = this;
    var ref = new Firebase(FirebaseUrl);
    init();
    function init(){
      //console.log($stateParams.id);
      //console.log($firebaseObject(ref.child('users').child($stateParams.id)));
    }
    $http.get('app/json/field.json').success(function(data){
      var players = [];
      var TournamentPlayers = data.Tournament.Players;
      TournamentPlayers.forEach(function(a){
        var part = a.PlayerName.split(', ');
        var PlayerName = part[1]+' '+part[0];
        players.push({
          Name:PlayerName
        });
      });

      $http.get('app/json/fecpoints.json').success(function(data){
        var Rankings = [];
        var standings = data.standings;
        standings.forEach(function(b){
          var firstName = b.firstName;
          var lastName = b.lastName;
          var fullName = firstName +' '+ lastName;
          players.forEach(function(c){
            var pName = c.Name;
            if(pName === fullName){
              Rankings.push(fullName);
            }
          });
        });
        var aPlayers = Rankings.splice(0,9);
        vm.aPlayers = aPlayers;
        var bPlayers = Rankings.splice(10,19);
        vm.bPlayers = bPlayers;
        var cPlayers = Rankings;
        vm.cPlayers = cPlayers;
      });

    });

    vm.profile = 1;
    vm.setTab = function(tabId){
      vm.profile = tabId;
    };
    vm.isSet = function(tabId){
      return vm.profile === tabId;
    };

    vm.aPlayerAdd = aPlayerAdd;
    function aPlayerAdd(id){
      //console.log(id);
    }
  }
})();

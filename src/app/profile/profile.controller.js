(function(){
  'use strict';
  angular
  .module('thatOneThing')
  .factory('user', user)
  .controller('ProfileController', ProfileController);

  function user(FirebaseUrl, $stateParams, $firebaseArray, Auth){
    var self = this;
    this.currentUser = $firebaseArray(FirebaseUrl.child('users').child($stateParams.id));
    Auth.$onAuth(function(user){
      self.user = user;
    });
  }
  function ProfileController($http, Auth, $stateParams, FirebaseUrl, $firebaseArray){
    var vm = this;

    $http.get('app/json/field.json').success(function(data){
      var players = [];
      var tPlayers = data.Tournament.Players;
      tPlayers.forEach(function(x){
        var names = x.PlayerName;
        var parts = names.split(', ');
        var fieldNames = parts[1]+' '+parts[0];
        players.push({
          Name:fieldNames
        });

      });
      $http.get('app/json/fedexPoints.json').success(function(data){
        var fedexCup = [];
        var standings = data.standings;
        standings.forEach(function(x){
          var firstName = x.firstName;
          var lastName = x.lastName;
          var fullName = firstName +' '+lastName;
          fedexCup.push({
            Name:fullName
          });
        });
        var rankings = [];
        for(var i = 0; i<fedexCup.length; i++){
          for(var x = 0; x<players.length; x++){
            if(fedexCup[i].Name === players[x].Name){
              rankings.push(fedexCup[i].Name);
            }
          }
        }

        var aPlayers = rankings.splice(0,19);
        vm.aPlayers = aPlayers;
        var bPlayers = rankings.splice(20,45);
        vm.bPlayers = bPlayers;
        var cPlayers = rankings;
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

    this.curretnUser.$loaded(function(){

    });
    vm.aPlayerAdd = aPlayerAdd;
    function aPlayerAdd(id){
      //console.log(id);
    }
  }
})();

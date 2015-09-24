(function(){
  'use strict';
  angular
  .module('thatOneThing')
  .controller('ProfileController', ProfileController);

  function ProfileController($http, Auth, $stateParams, FirebaseUrl, $firebaseObject, $firebaseArray){
    var vm = this;
    var ref = new Firebase(FirebaseUrl);
    var name;

    init();
    function init(){
      var user = $firebaseObject(ref.child('users').child($stateParams.id));
      user.$loaded().then(function(){
        name = user.fullName;
        var team = $firebaseArray(ref.child('userTeam').child(name).child('Team'));
        team.$loaded().then(function(data){
          angular.forEach(data, function(x){
            var index;
            if(x.Rank === 'A'){
              index = vm.aPlayers.indexOf(x.$id);
              vm.aPlayers.splice(index,1);
            }else if(x.Rank === 'B'){
              index = vm.bPlayers.indexOf(x.$id);
              vm.bPlayers.splice(index,1);
            }else if(x.Rank === 'C'){
              index = vm.cPlayers.indexOf(x.$id);
              vm.cPlayers.splice(index,1);
            }
          });
          vm.team = team;
        });
      });
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
          var fullName = firstName + ' ' + lastName;
          players.forEach(function(c){
            var pName = c.Name;
            if(pName === fullName){
              Rankings.push(fullName);
            }
          });
        });
        var aPlayers = Rankings.splice(0,10);
        vm.aPlayers = aPlayers;
        var bPlayers = Rankings.splice(10,20);
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
    function aPlayerAdd(p){
      add(p,'A');
    }

    vm.bPlayerAdd = bPlayerAdd;
    function bPlayerAdd(p){
      add(p,'B');
    }

    vm.cPlayerAdd = cPlayerAdd;
    function cPlayerAdd(p){
      add(p,'C');
    }

    function add(p, x){
      /* Need to
        - Count letters
        - Hava an easy way to get the stupid data out
        - Save the name to get that out easier
        - Maybe use what the example does
      */
      // var userTeam = ref.child('userTeam').child(name);
      // var teamUser = ref.child('userTeam').child(name).child('Team');
      vm.userTeam = $firebaseArray(ref.child('userTeam').child(name));
      vm.teamUser = $firebaseArray(ref.child('userTeam').child(name).child('Team'));
      vm.teamUser.$add({
        Name:p,
        Rank:x
      });
      vm.userTeam.$add({
        name:name
      });

    }

    vm.remove = remove;
    function remove(t){
      var userTeam = ref.child('userTeam').child(name).child('Team').child(t.$id);
      var count = function(){
        ref.child('userTeam').child(name).child('Count'+t.Rank).transaction(function(id){
          return(id || 0)-1;
        }, function(err, committed){
          if(err){
            console.log(err);
          }else if(committed){
            userTeam.remove();
          }
        });
      };
      if(t.Rank === 'A'){
        vm.aPlayers.push(t.$id);
        count();
      }else if(t.Rank === 'B'){
        vm.bPlayers.push(t.$id);
        count();
      }else if(t.Rank === 'C'){
        vm.cPlayers.push(t.$id);
        count();
      }
    }
  }
})();

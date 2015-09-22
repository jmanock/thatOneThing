(function(){
  'use strict';
  angular
  .module('thatOneThing')
  .controller('ProfileController', ProfileController);

  function ProfileController($http, Auth, $stateParams, FirebaseUrl, $firebaseObject){
    var vm = this;
    var ref = new Firebase(FirebaseUrl);
    var name;

    init();
    function init(){
      var user = $firebaseObject(ref.child('users').child($stateParams.id));
      user.$loaded().then(function(){
        name = user.fullName;
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
      var index = vm.aPlayers.indexOf(p);
      vm.aPlayers.splice(index,1);
      add(p,'A');
    }
    
    vm.bPlayerAdd = bPlayerAdd;
    function bPlayerAdd(p){
      var index = vm.bPlayers.indexOf(p);
      vm.bPlayers.splice(index,1);
      add(p,'B');
    }

    vm.cPlayerAdd = cPlayerAdd;
    function cPlayerAdd(p){
      var index = vm.cPlayers.indexOf(p);
      vm.cPlayers.splice(index,1);
      add(p,'C');
    }

    function add(p,x){
      var userTeam = ref.child('userTeam').child(name).child('Team').child(p);
      var count = function(c){
        FirebaseUrl.child('userTeam').child(name).child('Count'+x).transaction(function(count){
          if(count === null){
            count = 0;
          }
          if(count >= c){
            console.log('That is all the ' + x + ' Players you can have');
          }else{
            return(count ||0)+1;
          }
        }, function(err, committed){
          if(err){
            console.log(err);
          }else if(committed){
            userTeam.update({
              Rank:x
            });
          }
        });
      };
      if(x === 'A'){
        count(2);
      }else if(x === 'B'){
        count(2);
      }else if(x === 'C'){
        count(1);
      }
    }
  }
})();

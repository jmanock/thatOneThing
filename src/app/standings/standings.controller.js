(function(){
  'use strict';
  angular
  .module('thatOneThing')
  .controller('StandingsController', StandingsController);

  function StandingsController(FirebaseUrl, $firebaseArray, $firebaseObject){
    var vm = this;
    var ref = new Firebase(FirebaseUrl);
    init();
    function init(){
      var something =[];
      var teams = $firebaseArray(ref.child('userTeam'));
      vm.users = teams;
      teams.$loaded().then(function(data){
        data.forEach(function(k){
          var user = k.$id

          var team = $firebaseArray(ref.child('userTeam').child(user).child('Team'));
          //vm.users = team;
          team.$loaded().then(function(data){
            //something.User = user;
            data.forEach(function(x){
              var players = x.$id;
              something.push(players);
            });
            console.log(something);
          });

        });
      });
    }
  }
})();

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

      var teams = $firebaseArray(ref.child('userTeam'));
      teams.$loaded().then(function(data){
        data.forEach(function(k){
          var user = k.$id

          var team = $firebaseArray(ref.child('userTeam').child(user).child('Team'));
          team.$loaded().then(function(data){

            //vm.users = user;
            data.forEach(function(x){
              var players = x.$id;
              vm.users = players;
            });
          });
        });
      });
    }
  }
})();

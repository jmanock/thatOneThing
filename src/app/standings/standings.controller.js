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
      var leaderboard = $firebaseArray(ref.child('leaderboard'));
      vm.leaderboard = leaderboard;
      leaderboard.$loaded().then(function(data){
        data.forEach(function(x){
          //console.log(x.Name);
        });
      });

    }
  }
})();

(function(){
  'use strict';
  angular
  .module('thatOneThing')
  .controller('StandingsController', StandingsController);

  function StandingsController($scope, FirebaseUrl, $firebaseArray, $firebaseObject){
    var vm = this;
  init();
  function init(){
    var names = new Firebase('https://reditclone.firebaseio.com/userTeam');
    names.on('child_added', function(snapshot){
      var data = snapshot.val();
      var name = data.name;
      var score = data.score;
      console.log(name);
    });
  }
  }
})();

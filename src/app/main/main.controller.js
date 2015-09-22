(function() {
  'use strict';

  angular
    .module('thatOneThing')
    .factory('Auth', Auth)
    .controller('MainController', MainController);

  /** @ngInject */
  function Auth(FirebaseUrl, $firebaseAuth){
    var auth = new Firebase(FirebaseUrl);
    return $firebaseAuth(auth);
  }
  function MainController(toastr, Auth, FirebaseUrl) {
    var vm = this;
    var ref = new Firebase(FirebaseUrl);
    vm.login = login;
    vm.logout = logout;
    Auth.$onAuth(function(authData){
      vm.authData = authData;
    });
    function login(){
      Auth.$authWithOAuthPopup('facebook').then(function(authData){
        var user = ref.child('users').child(authData.uid);
        user.update({
          uid:authData.uid,
          facebook:authData.facebook,
          fullName:authData.facebook.displayName
        });
      }).catch(function(error){
        toastr.info(error);
      });
    }
    function logout(){
      Auth.$unauth();
    }
  }
})();

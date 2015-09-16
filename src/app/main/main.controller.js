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
  function MainController(toastr, Auth) {
    var vm = this;
    vm.login = login;
    vm.logout = logout;
    Auth.$onAuth(function(authData){
      vm.authData = authData;
      if(authData){
        console.log(authData);
      }else{
        console.log(authData);
      }
    });
    function login(){
      Auth.$authWithOAuthPopup('facebook').catch(function(error){
        console.error('Error authenticating with facebook', error);
      });
    }
    function logout(){
      Auth.$unauth();
    }
  }
})();

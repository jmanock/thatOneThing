(function() {
  'use strict';

  angular
    .module('thatOneThing')
    .factory('fbUrl', fbUrl)
    .factory('Auth', Auth)
    .controller('MainController', MainController);

  /** @ngInject */
  function fbUrl(FirebaseUrl){
    return new Firebase(FirebaseUrl);
  }
  function Auth(fbUrl, $firebaseAuth, $firebaseObject){
    var auth = $firebaseAuth(fbUrl);
    function updateUser(authData){
      if(authData === null){
        return null;
      }
      var user = fbUrl.child('users').child(authData.uid);
      user.update({
        uid:authData.uid,
        facebook:authData.facebook,
        fullName:authData.facebook.displayName
      });
      user = $firebaseObject(fbUrl.child('users').child(authData.uid));

      return user;
    }
    return{
      onAuth:function(cb){
        auth.$onAuth(function(data){
          cb(updateUser(data));
        });
      },
      login:function(){
        return auth.$authWithOAuthPopup('facebook');
      }
    };
  }

  function MainController(toastr, Auth) {
    var vm = this;
    vm.login = Auth.login;
    Auth.onAuth(function(user){
      vm.user = user;
      console.log(user);
    });

  }
})();

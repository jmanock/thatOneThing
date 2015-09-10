(function() {
  'use strict';

  angular
    .module('thatOneThing')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(toastr, FirebaseUrl, $scope, $firebaseObject) {
    var vm = this;
    vm.login = login;

    function login(){
      vm.message = !vm.message;
      var ref = new Firebase(FirebaseUrl);
      ref.authWithOAuthPopup('facebook', function(error, authData){
        if(!error){
          toastr.info('Something went wrong but its right');
          var user = ref.child('users').child(authData.uid);
          user.update({
            uid:authData.uid,
            facebook:authData.facebook,
            fullName:authData.facebook.displayName
          });

          // console.log(user);
          return user;
           //console.log(authData.facebook);


        }else{

        }
      });
    }

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1441820769124;
    vm.showToastr = showToastr;

    activate();

    function activate() {


    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

  }
})();

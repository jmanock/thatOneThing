(function() {
  'use strict';

  angular
    .module('thatOneThing')
    .factory('Auth', Auth)
    .controller('MainController', MainController);

  /** @ngInject */
  function Auth($firebaseAuth, FirebaseUrl){
    var endingPoints = FirebaseUrl;
    var userRef = new Firebase(endingPoints);
    return $firebaseAuth(userRef);
  }

  function MainController(toastr, $scope, Auth) {
    var vm = this;

    $scope.login = function(authMethod){
      Auth.$authWithOAuthPopup(authMethod).then(function(authData){
        Auth.$onAuth(function(authData){
          if(authData === null){
            console.log('no log in yet');
          }else{
            console.log('Logged in as', authData.facebook);
          }
          $scope.authData = authData;
        });
      }).catch(function(error){
        if(error.code === 'TRANSPORT_UNAVAILABLE'){
          Auth.$authWithOAuthReRedirect(authMethod).then(function(authDat){
            console.log('this should not show up');
          });
        }else{
          console.log(error);
        }
      });
      // Auth.$onAuth(function(authData){
      //   if(authData === null){
      //     console.log('No log in yet');
      //   }else{
      //     console.log('Logged in as', authData);
      //   }
      //   $scope.authData = authData;
      // });
    };

    // function login(){
    //   vm.message = !vm.message;
    //   var ref = new Firebase(FirebaseUrl);
    //   ref.authWithOAuthPopup('facebook', function(error, authData){
    //     if(!error){
    //       toastr.info('Something went wrong but its right');
    //       var user = ref.child('users').child(authData.uid);
    //       user.update({
    //         uid:authData.uid,
    //         facebook:authData.facebook,
    //         fullName:authData.facebook.displayName
    //       });






      //   }else{
      //
      //   }
      // });
    //}

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

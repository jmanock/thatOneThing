(function() {
  'use strict';

  angular
    .module('thatOneThing')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(toastr, FirebaseUrl, $scope) {
    var vm = this;
    vm.login = login;

    function login(){

      var ref = new Firebase(FirebaseUrl);
      ref.authWithOAuthPopup('facebook', function(error, authData){
        if(!error){
          $scope.something = 'Ok should this work???';
          // console.log(authData.facebook.displayName);
          toastr.info('Something went wrong but its right');
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

// (function(){
//   'use strict';
//   angular
//   .module('thatOneThing')
//   .controller('MainController', MainController);
//
//   function MainController($timeout, webDevTec, toastr){
//     var self = this;
//     self.awesomeThings = [];
//     self.classAnimation = '';
//     self.creationDate = 1441757393356;
//     self.showToastr = showToastr;
//     activate();
//     function activate(){
//       getWebDevTec();
//       $timeout(function(){
//         self.classAnimation = 'rubberBand';
//       },4000);
//     }
//     function showToastr(){
//       toastr.info('Fork something and help out');
//       console.log('yes thats what i said fork something');
//       self.classAnimation = '';
//     }
//     function getWebDevTec(){
//       self.awesomeThings = webDevTec.getTec();
//       angular.forEach(self.awesomThings, function(awesomeThing){
//         awesomeThing.rank = Math.random();
//       });
//     }
//   }
// })();
(function(){
  'use strict';
  angular
  .module('thatOneThing')

  .controller('MainController', MainController);


  function MainController(FirebaseUrl){
    var vm = this;
    vm.login = login;
    function login(){
      var ref = new Firebase(FirebaseUrl);
      ref.authWithOAuthPopup('facebook', function(error, authData){
        if(error){
          console.log(error);
        }else{
          console.log(authData);
        }
      });
    }
  }
  // function MainController( toastr){
  //   var vm = this;
  //   vm.login = login;
  //   function login(){
  //     FirebaseUrl.authWithOAuthPopup('facebook', function(error, authData){
  //       if(error){
  //         toastr.info(error);
  //       }else{
  //         toastr.info('Loged in: '+ authData.facebook.displayName);
  //
  //         var user = FirebaseUrl.child('users').child(authData.uid);
  //         user.update({
  //           uid:authData.uid,
  //           facebook:authData.facebook,
  //           fullName:authData.facebook.displayName,
  //
  //         });
  //       }
  //     });
  //   }
  // }

})();

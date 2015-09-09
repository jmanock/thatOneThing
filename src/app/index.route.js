(function() {
  'use strict';

  angular
    .module('thatOneThing')
    .config(routeConfig)
    .constant('FirebaseUrl','https://reditclone.firebaseio.com');

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('profile',{
        url:'/profile/:id',
        templateUrl:'app/profile/profile.html',
        controller:'ProfileController',
        controllerAs:'profile'
      })
      .state('standings', {
        url:'/standings',
        templateUrl:'app/standings/standings.html',
        controller:'StandingsController',
        controllerAs:'standings'
      });

    $urlRouterProvider.otherwise('/');
  }

})();

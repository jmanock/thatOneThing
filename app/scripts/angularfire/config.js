angular.module('firebase.config', [])
  .constant('FBURL', 'https://reditclone.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','facebook'])

  .constant('loginRedirectPath', '/login');

/* global malarkey:false, toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('thatOneThing')
    .constant('malarkey', malarkey)
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('FirebaseUrl', 'https://reditclone.firebaseio.com/');

})();

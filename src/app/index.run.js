(function() {
  'use strict';

  angular
    .module('thatOneThing')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();

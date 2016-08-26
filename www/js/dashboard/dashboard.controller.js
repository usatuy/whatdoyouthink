(function() {
  'use strict';

  angular
    .module('wdt')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController($log) {
    var vm = this;
    $log.debug(vm);

  }

})();

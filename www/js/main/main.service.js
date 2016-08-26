(function () {
  'use strict';

  angular
    .module("wdt")
    .service("MainSrv", MainSrv);

  /** @ngInject */
  function MainSrv($log,localStorageService) {

    var mainSrv = {
      getUser: getUser
    };

    return mainSrv;

    function getUser(key) {
      return localStorageService.get(key);
    }

  }

})();

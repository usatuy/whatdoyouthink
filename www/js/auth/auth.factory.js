(function () {
  'use strict';

  angular
    .module("wdt")
    .factory("Auth", Auth);

  /** @ngInject */
  function Auth($firebaseAuth) {
		return $firebaseAuth();
  }

})();

(function() {
  'use strict';

  angular
    .module('wdt')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, $state, Auth, MainSrv, localStorageService) {
    var vm = this;

    vm.logout = logout;

    var firebaseUser = Auth.$getAuth();
    Auth.$getUser(firebaseUser.uid).then(function () {
      vm.user = MainSrv.getUser('user');
    });



    function logout() {
      Auth.$signOut();
      removeItem('user');
      $state.go('login');
    }

    function removeItem(key) {
      return localStorageService.remove(key);
    }

  }

})();

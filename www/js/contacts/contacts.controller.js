(function() {
  'use strict';

  angular
    .module('wdt')
    .controller('ContactsController', ContactsController);

  /** @ngInject */
  function ContactsController($log, $ionicPlatform, $cordovaContacts, ContactsSrv) {
    var vm = this;

    // vm.contacts = [];

    $log.log("get contacts");
    $ionicPlatform.ready(function() {
      $cordovaContacts.find({}).then(function(allContacts) {
        vm.contacts = allContacts;
      });
    });
    $log.debug(JSON.stringify(vm.contacts));
  }

})();

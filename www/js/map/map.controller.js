(function() {
  'use strict';

  angular
    .module('wdt')
    .controller('PlacesMapController', PlacesMapController);

  /** @ngInject */
  function PlacesMapController($log) {
    var vm = this;
    
    vm.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
  }

})();

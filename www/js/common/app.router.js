angular
  .module('wdt')
  .provider('routerHelper', routerHelperProvider);

/** @ngInject */
function routerHelperProvider($stateProvider, $urlRouterProvider) {

  this.$get = RouterHelper;

  RouterHelper.$inject = ['$state'];

  function RouterHelper($state) {
    var hasOtherwise = false;

    var routerHelper = {
      configureStates: configureStates,
      getStates: getStates
    };

    return routerHelper;

    function configureStates(states, otherwisePath) {
      states.forEach(function (state) {
        $stateProvider.state(state.state, state.config);
      });
      if (otherwisePath && !hasOtherwise) {
        hasOtherwise = true;
        $urlRouterProvider.otherwise(otherwisePath);
      }
    }

    function getStates() {
      return $state.get();
    }
  }

}

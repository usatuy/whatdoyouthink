angular.module('wdt', ['ionic', 'ngCordova', 'ui.router', 'permission', 'permission.ui', 'uiGmapgoogle-maps', 'ngMessages', 'firebase', 'LocalStorageModule'])

  .run(function ($log, $ionicPlatform, $http, $q, $rootScope, $state, $cordovaStatusbar, Auth, PermPermissionStore, routerHelper) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });

    routerHelper.configureStates(getStates(), '/login');

    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
      if (error === "AUTH_REQUIRED") {
        $state.go("login");
      }
    });



    function getStates() {
      return [
        {
          state: 'login',
          config: {
            url: '/login',
            controller: 'LoginController',
            controllerAs: 'loginControllerVm',
            templateUrl: 'js/auth/login.html'
          }
        },
        {
          state: 'createuser',
          config: {
            url: '/createuser',
            templateUrl: 'js/user/createuser.html',
            controller: 'CreateUserController',
            controllerAs: 'createUserControllerVm',
            resolve: {
              "currentAuth": ["Auth", function(Auth) {
                return Auth.$requireSignIn();
              }]
            }
          }
        },
        {
          state: 'main',
          config: {
            abstract: true,
            controller: 'MainController',
            controllerAs: 'mainControllerVm',
            templateUrl: 'js/main/main.html'
          }
        },
        {
          state: 'main.dashboard',
          config: {
            url: '/dashboard',
            templateUrl: 'js/dashboard/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'dashboardControllerVm',
            resolve: {
              "currentAuth": ["Auth", function(Auth) {
                return Auth.$requireSignIn();
              }]
            }
          }
        },
        {
          state: 'main.map',
          config: {
            url: '/map',
            templateUrl: 'js/map/map.html',
            controller: 'PlacesMapController',
            controllerAs: 'placesMapControllerVm',
            resolve: {
              "currentAuth": ["Auth", function(Auth) {
                return Auth.$requireSignIn();
              }]
            }
          }
        },
        {
          state: 'main.contacts',
          config: {
            url: '/contacts',
            templateUrl: 'js/contacts/contacts.html',
            controller: 'ContactsController',
            controllerAs: 'contactsControllerVm',
            resolve: {
              "currentAuth": ["Auth", function(Auth) {
                return Auth.$requireSignIn();
              }]
            }
          }
        }
      ];
    }

  });



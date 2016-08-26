(function () {
  'use strict';

  angular
    .module("wdt")
    .service("ContactsSrv", ContactsSrv);

  /** @ngInject */
  function ContactsSrv($q, $http, $log, $ionicPlatform, $cordovaContacts, $cordovaDevice) {

    var randomUsersApiUrl = 'https://randomuser.me/api/';

    var authService = {
      getUsers: getUsers
    };

    return authService;

    function getUsers() {

      $ionicPlatform.ready(function() {
        var platform = $cordovaDevice.getPlatform();

        if(platform == 'Android') {
          var contacts;
          $cordovaContacts.find([]).then(function(allContacts) {
            contacts = allContacts;
            return contacts;
          });
        } else {
          var deferred = $q.defer();

          $http.get(randomUsersApiUrl, {
              params: {
                results: 25
                }
            })
            .then(
              function (response) {
                deferred.resolve(response.data.results);
              },
              function (response) {
                deferred.reject(response);
              }
            );

          return deferred.promise;
        }
      });




    }

  }

})();

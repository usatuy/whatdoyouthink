(function() {
  'use strict';

  angular
    .module('wdt')
    .config(AuthDecorator);

  function AuthDecorator($provide) {

    $provide.decorator('Auth', function ($delegate, $firebaseObject, $log, api, $state, localStorageService) {
      $delegate.$createUserProfile = function(uid, user) {
        var ref = firebase.database().ref();
        $log.log(uid,'auth.decorator.js');
        var profile = {
          id: uid,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          gender: user.gender,
          registered_in:  + new Date()
        };

        var profileRef = $firebaseObject(ref.child('profiles').child(uid));
        angular.extend(profileRef, profile);
        return profileRef.$save().then(function(ref) {
          $state.go('main.dashboard');
        }, function(error) {
          $log.error(error,'auth.decorator.js');
        });
      };

      /**
       * User signIn
       * @param {Object} user - User object
       * @param {String} user.name - User name
       * @param {String} user.password - User password
       * @param {String?} user.provider - Social name (facebook, twitter)
       */
      $delegate.$signIn = function(user) {
        if(user.provider) {
          return this.$signInWithPopup(user.provider);
        } else {
          return this.$createUserWithEmailAndPassword(user.email, user.password);
        }
      };

      $delegate.$getUser = function (uid) {
        var ref = firebase.database().ref('profiles/' + uid);
        var obj = $firebaseObject(ref);
        return obj.$loaded().then(function (res) {
          var user = {
            id: res.id,
            name: res.name,
            avatar: res.avatar,
            phone: res.phone,
            email: res.email,
            gender: res.gender
          };
          submit('user',user);
          return user;
        });
      };

      function submit(key, val) {
        return localStorageService.set(key, val);
      }

      return $delegate;
    })
  }

})();

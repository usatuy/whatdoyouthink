(function() {
    'use strict';

	angular
		.module('wdt')
		.controller('LoginController', LoginController);

  /** @ngInject */
	function LoginController($log, Auth, $state, $firebaseObject) {
		var vm = this;

		vm.social = social;
    vm.registration = registration;
    vm.signIn = signIn;

    function social(user) {
      Auth.$signIn(user).then(function (firebaseUser) {
        goToCreateUser(firebaseUser.user.uid);
      }).catch(function(error) {
        $log.error(error);
      });
    }

    function registration(user) {
      Auth.$signIn(user).then(function () {
        $state.go('createuser');
      }).catch(function(error) {
        $log.error(error);
      });
    }

    function signIn(user) {
      Auth.$signInWithEmailAndPassword(user.email, user.password).then(function(firebaseUser) {
        goToCreateUser(firebaseUser.uid);
      }).catch(function(error) {
        $log.error(error);
      });
    }

    function goToCreateUser(id) {
      var ref = firebase.database().ref('profiles/' + id);
      var obj = $firebaseObject(ref);
      obj.$loaded().then(function () {
        if(obj.phone) {
          $state.go('main.dashboard');
        } else {
          $state.go('createuser'); 
        }
      });
    }
	}

})();

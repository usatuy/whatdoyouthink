(function() {
  'use strict';

  angular
    .module('wdt')
    .controller('CreateUserController', CreateUserController);

  /** @ngInject */
  function CreateUserController($log, Auth, $ionicHistory, $cordovaCamera) {
    var vm = this;

    vm.createUser = createUser;
    vm.pickAvatar = pickAvatar;
    vm.avatar = '';
    vm.phoneReg = /^\+[1-9]{1}[0-9]{3,14}$/;
    var firebaseUser = Auth.$getAuth();

    $ionicHistory.clearHistory();

    function pickAvatar() {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options)
        .then(function (results) {
            vm.avatar = "data:image/jpeg;base64," + results;
        }, function(error) {
          // error getting photos
        });
    }

    function createUser() {
      if(vm.avatar == '' && vm.user.gender == 'male'){
        vm.avatar = '/img/male.png';
      }
      if(vm.avatar == '' && vm.user.gender == 'female'){
        vm.avatar = '/img/female.png';
      }
      var user = {
        name: vm.user.first_name,
        email: firebaseUser.email,
        phone: vm.user.phone,
        gender: vm.user.gender,
        avatar: vm.avatar
      };
      Auth.$createUserProfile(firebaseUser.uid, user);
    }

  }

})();

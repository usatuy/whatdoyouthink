angular
  .module('wdt')
  .constant('api', {
    firebase: 'https//what-28658.firebaseio.com/'
  })
  .config(function () {
    var config = {
      apiKey: "AIzaSyAqh9Zdt5VJnWJKXjqh7W2Vj3CBus1zbKw",
      authDomain: "what-28658.firebaseapp.com",
      databaseURL: "https://what-28658.firebaseio.com",
      storageBucket: "what-28658.appspot.com"
    };
    firebase.initializeApp(config);
  }).config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('wdt')
    .setStorageType('localStorage');
  });

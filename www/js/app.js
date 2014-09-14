// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','AttendanceFactories','ngCordova.plugins.localNotification','ngCordova.plugins.splashscreen'])

.run(function($ionicPlatform,$cordovaLocalNotification,$cordovaSplashscreen) {

//$cordovaSplashscreen.show();

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

   

  }).then(function(data) {
    $cordovaSplashscreen.hide()
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider


    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html"
        }
      }
    })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    
    .state('app.update',{
      url: "/update/:subjectId",
      views: {
        'menuContent': {
          templateUrl: "templates/update.html",
          controller: 'UpdateController'
        }
      }
    })

    .state('app.set', {
      url: "/set",
      views: {
        'menuContent': {
          templateUrl: "templates/set.html",
          controller: 'PlaylistsCtrl'
        }
      } 
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');

  
});


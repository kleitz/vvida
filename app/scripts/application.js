(function() {
  'use strict';
  angular.module('vvida.controllers', []);
  angular.module('vvida.services', []);
  angular.module('vvida.filters', []);
  angular.module('vvida.directives', []);

  //Require Services
  require('./services/utils');
  require('./services/users');
  require('./services/categories');
  require('./services/countries');
  require('./services/items');
  require('./services/events');
  require('./services/reviews');
  require('./services/auth');


  // Require Controllers
  require('./controllers/footer');
  require('./controllers/home');
  require('./controllers/profile');
  require('./controllers/about');
  require('./controllers/login');
  require('./controllers/welcome');
  require('./controllers/header');
  require('./controllers/items');
  require('./controllers/event');

  window.app = angular.module('vvida', [
    'vvida.controllers',
    'vvida.services',
    'vvida.filters',
    'vvida.directives',
    'ngRoute',
    'ui.router',
    'ngResource',
    'ngMaterial',
    'angularFileUpload'
  ]);

  window.app.run(['$rootScope', '$location', '$state', '$mdSidenav', 'Users', 'Auth',
    function($rootScope, $location, $state, $mdSidenav, Users, Auth) {
      // Check if the user's session is still being persisted in the servers
      if (Auth.isLoggedIn()) {
        Users.session(function(err, res) {
          if (!err) {
            $rootScope.currentUser = res;
          } else {
            console.log('Error: ', err.error);
          }
        });
      } else {
        $state.go('home');
      }

      $rootScope.menu = [{
        name: 'Home',
        state: 'home'
      }, {
        name: 'About',
        state: 'about'
      }, {
        name: 'Events',
        state: 'events'
      }];

      $rootScope.openLeftMenu = function() {
        $mdSidenav('left').toggle();
      };

      $rootScope.closeLeftMenu = function() {
        $mdSidenav('left').close();
      };
    }
  ]);

  window.app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$mdThemingProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise('/404');

    // Now set up the states
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('deep-orange');

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'views/home.html'
      })
      .state('about', {
        url: '/about',
        controller: 'AboutCtrl',
        templateUrl: 'views/about.html'
      })
      .state('events', {
        url: '/events',
        controller: 'EventCtrl',
        templateUrl: 'views/events.html'
      })
      .state('profile', {
        url: '/user/{id}/edit',
        controller: 'ProfileCtrl',
        templateUrl: 'views/edit-profile.html'
      })
      .state('addItem', {
        url: '/items/create',
        controller: 'ItemCtrl',
        templateUrl: 'views/edit-item.html'
      })
      .state('editItem', {
        url: '/items/{id}/edit',
        controller: 'ItemCtrl',
        templateUrl: 'views/edit-item.html'
      })
      .state('addEvent', {
        url: '/events/create',
        controller: 'EventCtrl',
        templateUrl: 'views/add-event.html'
      })
      .state('editEvent', {
        url: '/events/{id}/edit',
        controller: 'EventCtrl',
        templateUrl: 'views/edit-event.html'
      })
      .state('login', {
        url: '/users/login',
        controller: 'LoginCtrl',
        templateUrl: 'views/login.html'
      })
      .state('welcome', {
        url: '/welcome',
        controller: 'WelcomeCtrl',
        templateUrl: 'views/welcome.html'
      })
      .state('review', {
        url: '/review',
        controller: 'ReviewCtrl',
        templateUrl: 'views/review.html'
      })
      .state('upload', {
        url: '/upload',
        controller: 'AboutCtrl',
        templateUrl: 'views/upload.html'
      })
      .state('review')
      .state('404', {
        url: '/404',
        templateUrl: 'views/404.html',
        controller: function($scope) {}
      });

    $locationProvider.html5Mode(true);
  }]);

})();

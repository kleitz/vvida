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


  // Require Controllers
  require('./controllers/footer');
  require('./controllers/home');
  require('./controllers/profile');
  require('./controllers/about');
  require('./controllers/login');
  require('./controllers/welcome');
  require('./controllers/header');
  require('./controllers/items');
  require('./controllers/edit-item');

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

  window.app.run(['$rootScope', '$location', '$mdSidenav', 'Users',
    function($rootScope, $location, $mdSidenav, Users) {
      // Check if the user's session is still being persisted in the servers
      Users.session(function(err, res) {
        if (!err) {
          $rootScope.currentUser = res;
        } else {
          console.log('Error: ', err.error);
        }
      });

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
        controller: 'EventsCtrl',
        templateUrl: 'views/events.html'
      })
      .state('profile', {
        url: '/user/{id}/edit',
        controller: 'ProfileCtrl',
        templateUrl: 'views/edit-profile.html'
      })
      .state('editItem', {
        url: '/item/{id}/edit',
        controller: 'ItemsImgCtrl',
        templateUrl: 'views/edit-item.html'
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
      .state('upload', {
        url: '/upload',
        controller: 'AboutCtrl',
        templateUrl: 'views/upload.html'
      })
      .state('404', {
        url: '/404',
        templateUrl: 'views/404.html',
        controller: function($scope) {}
      })
      .state('item', {
        url: '/items',
        controller: 'ItemsCtrl',
        templateUrl: 'views/items.html'
      });

    $locationProvider.html5Mode(true);
  }]);

})();

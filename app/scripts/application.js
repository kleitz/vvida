(function() {
  'use strict';
  angular.module('vvida.controllers', []);
  angular.module('vvida.services', []);
  angular.module('vvida.filters', []);
  angular.module('vvida.directives', []);

  //Require Services
  require('./services/utils');
  require('./services/users');
  require('./services/countries');

  // Require Controllers
  require('./controllers/footer');
  require('./controllers/home');
  require('./controllers/profile');
  require('./controllers/about');
  require('./controllers/login');
  require('./controllers/header');
  require('./controllers/userProfile');

  window.app = angular.module('vvida', [
    'vvida.controllers',
    'vvida.services',
    'vvida.filters',
    'vvida.directives',
    'ui.router',
    'ngResource',
    'ngMaterial'
  ]);

  window.app.run(['$rootScope', '$location', 'Users',
    function($rootScope, $location, Users) {
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
      .state('userProfile', {
        url: '/user/profile',
        controller: 'MainProfileCtrl',
        views: {
          '': {
            controller: 'UserProfileCtrl',
            templateUrl: 'views/user-profile.html',
          },
          'Reviews@userProfile': {
            controller: 'UserReviewsCtrl',
            templateUrl: 'views/user-reviews.html',
          },
          'Events@userProfile': {
            controller: 'UserEventsCtrl',
            templateUrl: 'views/user-events.html',
          },
          'Products@userProfile': {
            controller: 'UserProductsCtrl',
            templateUrl: 'views/user-products.html',
          },
          'Pictures@userProfile': {
            controller: 'UserPicturesCtrl',
            templateUrl: 'views/user-pictures.html',
          },
        }
      })
      .state('login', {
        url: '/users/login',
        controller: 'LoginCtrl',
        templateUrl: 'views/login.html'
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

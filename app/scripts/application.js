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
  require('./services/auth');

  // Require Controllers
  require('./controllers/footer');
  require('./controllers/home');
  require('./controllers/profile');
  require('./controllers/about');
  require('./controllers/login');
  require('./controllers/welcome');
  require('./controllers/header');
  require('./controllers/user-profile/index');
  require('./controllers/user-profile/events');
  require('./controllers/user-profile/items');
  require('./controllers/user-profile/pictures');
  require('./controllers/user-profile/reviews');
  require('./controllers/items');
  require('./controllers/edit-item');

  window.app = angular.module('vvida', [
    'vvida.controllers',
    'vvida.services',
    'vvida.filters',
    'vvida.directives',
    'ui.router',
    'ngResource',
    'ngMaterial',
    'angularFileUpload'
  ]);

  window.app.run(['$rootScope', '$location', '$state', '$mdSidenav', 'Users',
    function($rootScope, $location, $state, $mdSidenav, Users) {
      // Check if the user's session is still being persisted in the servers
      Users.session(function(err, res) {
        if (!err) {
          $rootScope.currentUser = res;
        } else {
          console.log('Error: ', err.error);
        }
      });

      $rootScope.login = function() {
        $state.go('login');
      };

      $rootScope.menu = [{
        name: 'Home',
        state: 'home'
      }, {
        name: 'About',
        state: 'about'
      }, {
        name: 'Events',
        state: 'events'
      }, {
        name: 'Products',
        state: 'item'
      }];

      $rootScope.openLeftMenu = function() {
        $mdSidenav('left').toggle();
      };

      $rootScope.closeLeftMenu = function() {
        $mdSidenav('left').close();
      };
    }
  ]);

  window.app.config(['$stateProvider', '$httpProvider', '$urlRouterProvider', '$locationProvider', '$mdThemingProvider', function($stateProvider, $httpProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {

    $httpProvider.interceptors.push('TokenInjector');

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
          }
        }
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
        templateUrl: 'views/404.html'
      })
      .state('item', {
        url: '/items',
        controller: 'ItemsCtrl',
        templateUrl: 'views/items.html'
      });

    $locationProvider.html5Mode(true);
  }]);

})();

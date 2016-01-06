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
  require('./services/token');
  require('./services/auth');
  require('./services/token-injector');

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
  require('./controllers/event');
  require('./controllers/review');

  // Require Directives
  require('./directives/ng-thumb');

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

  window.app.run(['$rootScope', '$location', '$state', '$mdSidenav', 'Users',
    function($rootScope, $location, $state, $mdSidenav, Users) {
      // Check if the user's session is still being persisted in the servers
      Users.session(function(err, res) {
        if (!err) {
          var user = {};
          if (res.name) {
            user.name = res.name;
            user.id = res.id;
            user.img_url = res.picture.data.url;
          } else {
            var fullName = res.firstname + ' ' + res.lastname;
            user.name = fullName;
            user.id = res.id;
            user.img_url = res.img_url;
          }
          if (user.img_url) {
            $rootScope.currentUser = user;
            console.log($rootScope.currentUser);
          }
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
        state: 'items'
      }];

      $rootScope.openLeftMenu = function() {
        $mdSidenav('left').toggle();
      };

      $rootScope.closeLeftMenu = function() {
        $mdSidenav('left').close();
      };
    }
  ]);

  window.app.config(['$stateProvider', '$httpProvider', '$urlRouterProvider', '$locationProvider', '$mdThemingProvider',
    function($stateProvider, $httpProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {

      $httpProvider.interceptors.push('TokenInjector');

      // For any unmatched url, redirect to /state1
      $urlRouterProvider.otherwise('/404');

      // Now set up the states
      $mdThemingProvider.theme('default')
        .primaryPalette('green')
        .accentPalette('orange');

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

      .state('items', {
          url: '/items',
          controller: 'ItemCtrl',
          templateUrl: 'views/items.html'
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
        .state('addItem', {
          url: '/items/create',
          controller: 'ItemCtrl',
          templateUrl: 'views/add-item.html'
        })
        .state('editItem', {
          url: '/items/{id}/edit',
          controller: 'ItemCtrl',
          templateUrl: 'views/edit-item.html'
        })
        .state('viewItem', {
          url: '/items/{id}/view',
          controller: 'ItemCtrl',
          templateUrl: 'views/view-item.html'
        })
        .state('categoryItems', {
          url: '/categories/{catid}/view',
          controller: 'ItemCtrl',
          templateUrl: 'views/items.html'
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
        .state('review', {
          url: '/review',
          controller: 'ReviewCtrl',
          templateUrl: 'views/review.html'
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
        });
      $locationProvider.html5Mode(true);
    }
  ]);

})();

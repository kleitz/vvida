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
  require('./services/images');
  require('./services/items');
  require('./services/events');
  require('./services/reviews');
  require('./services/token');
  require('./services/auth');
  require('./services/token-injector');
  require('./services/reservations');
  require('./services/notifications');
  require('./services/promotions');
  require('./services/messages');

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
            user.email = res.email;
          } else {
            var fullName = res.firstname + ' ' + res.lastname;
            user.name = fullName;
            user.id = res.id;
            user.img_url = res.img_url;
            user.email = res.email;
          }
          if (user.img_url) {
            $rootScope.currentUser = user;
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
        state: 'events.page'
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

  window.app.config(['$stateProvider', '$httpProvider', '$urlRouterProvider',
    '$locationProvider', '$mdThemingProvider',
    function($stateProvider, $httpProvider, $urlRouterProvider,
      $locationProvider, $mdThemingProvider) {

      $httpProvider.interceptors.push('TokenInjector');

      // For any unmatched url, redirect to /state1
      $urlRouterProvider.otherwise('/404');


      // Set up theme the entire application
      $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('pink');

      // Set up states
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
        .state('events.all', {
          url: '/{view}/?{page}',
          views: {
            'inner@events': {
              controller: 'EventCtrl',
              templateUrl: 'views/all-events.html',
            }
          }
        })
        .state('events.page', {
          url: '',
          views: {
            'inner@events': {
              controller: 'EventCtrl',
              templateUrl: 'views/event-page.html',
            }
          }
        })
        .state('viewEvent', {
          url: '/events/{id}',
          controller: 'EventCtrl',
          templateUrl: 'views/view-event.html'
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
          controller: 'UserProfileCtrl',
          templateUrl: 'views/user-profile.html'
        })
        .state('userProfile.edit', {
          url: '/{id}/edit',
          views: {
            'inner-view@userProfile': {
              controller: 'ProfileCtrl',
              templateUrl: 'views/edit-profile.html'
            },
          }
        })
        .state('userProfile.products', {
          url: '/products',
          views: {
            'inner-view@userProfile': {
              controller: 'UserProductsCtrl',
              templateUrl: 'views/user-products.html'
            }
          }
        })
        .state('userProfile.events', {
          url: '/events',
          views: {
            'inner-view@userProfile': {
              controller: 'UserEventsCtrl',
              templateUrl: 'views/user-events.html'
            }
          }
        })
        .state('userProfile.editEvent', {
          url: '/events/{id}/edit',
          views: {
            'inner-view@userProfile': {
              controller: 'UserEventsCtrl',
              templateUrl: 'views/edit-event.html'
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
          params:{
            tabIndex:0
          },
          controller: 'ItemCtrl',
          templateUrl: 'views/edit-item.html'
        })
        .state('viewItem', {
          url: '/items/{id}',
          controller: 'ItemCtrl',
          templateUrl: 'views/view-item.html'
        })
        .state('categoryItems', {
          url: '/categories/{catId}',
          controller: 'ItemCtrl',
          templateUrl: 'views/items.html'
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
        });
      $locationProvider.html5Mode(true);
    }
  ]);

})();

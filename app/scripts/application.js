(function() {
  'use strict';
  angular.module('vvida.controllers', []);
  angular.module('vvida.services', []);
  angular.module('vvida.filters', []);
  angular.module('vvida.directives', []);

  require('./controllers/home');

  window.app = angular.module('vvida', [
    'vvida.controllers',
    'vvida.services',
    'vvida.filters',
    'vvida.directives',
    'ui.router',
    'ngMaterial'
  ]);

  window.app.run(['$rootScope', function($rootScope) {

    $rootScope.menu = [{
      name: 'Home',
      state: 'home'
    }, {
      name: 'About',
      state: 'about'
    }];

  }]);

  window.app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$mdThemingProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/404");
    //
    // Now set up the states
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('deep-orange');
    $stateProvider
      .state('home', {
        url: "/",
        controller: 'HomeCtrl',
        templateUrl: "views/home.html"
      })
      .state('about', {
        url: "/about",
        controller: 'HomeCtrl',
        templateUrl: "views/about.html"
      })
      .state('404', {
        url: "/404",
        templateUrl: "views/404.html",
        controller: function($scope) {}
      });

    $locationProvider.html5Mode(true);
  }]);
})();

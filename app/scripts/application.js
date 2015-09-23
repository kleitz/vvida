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
    }, {
      name: 'Events',
      state: 'events'
    }, {
      name: 'Log In',
      state: 'login'
    }];

    $rootScope.discover = [{
      name: 'The Weekly Vvida',
      state: 'home'
    }, {
      name: 'Vvida Blog',
      state: 'home'
    }, {
      name: 'Support',
      state: 'home'
    }, {
      name: 'Vvida Mobile',
      state: 'home'
    }, {
      name: 'Developers',
      state: 'home'
    }, {
      name: 'RSS Feed',
      state: 'home'
    }];

    $rootScope.business = [{
      name: 'Claim your Business Page',
      state: 'home'
    }, {
      name: 'Advertise on Vvida',
      state: 'home'
    }, {
      name: 'Support',
      state: 'home'
    }, {
      name: 'Business Success Stories',
      state: 'home'
    }, {
      name: 'Business Support',
      state: 'home'
    }, {
      name: 'Vvida Blog for Business Owners',
      state: 'home'
    }];

    $rootScope.about = [{
      name: 'About Vvida',
      state: 'home'
    }, {
      name: 'Press',
      state: 'home'
    }, {
      name: 'Content Guidelines',
      state: 'home'
    }, {
      name: 'Terms of Service',
      state: 'home'
    }, {
      name: 'Private Policy',
      state: 'home'
    }, {
      name: 'Ad Choices',
      state: 'home'
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
      .state('events', {
        url: "/events",
        controller: 'HomeCtrl',
        templateUrl: "views/events.html"
      })
      .state('404', {
        url: "/404",
        templateUrl: "views/404.html",
        controller: function($scope) {}
      });

    $locationProvider.html5Mode(true);
  }]);
})();

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
      state: 'footer'
    }, {
      name: 'Vvida Blog',
      state: 'footer'
    }, {
      name: 'Support',
      state: 'footer'
    }, {
      name: 'Vvida Mobile',
      state: 'footer'
    }, {
      name: 'Developers',
      state: 'footer'
    }, {
      name: 'RSS Feed',
      state: 'footer'
    }];

    $rootScope.business = [{
      name: 'Claim your Business Page',
      state: 'footer'
    }, {
      name: 'Advertise on Vvida',
      state: 'footer'
    }, {
      name: 'Support',
      state: 'footer'
    }, {
      name: 'Business Success Stories',
      state: 'footer'
    }, {
      name: 'Business Support',
      state: 'footer'
    }, {
      name: 'Vvida Blog for Business Owners',
      state: 'footer'
    }];

    $rootScope.about = [{
      name: 'About Vvida',
      state: 'footer'
    }, {
      name: 'Press',
      state: 'footer'
    }, {
      name: 'Content Guidelines',
      state: 'footer'
    }, {
      name: 'Terms of Service',
      state: 'footer'
    }, {
      name: 'Private Policy',
      state: 'footer'
    }, {
      name: 'Ad Choices',
      state: 'footer'
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
      .state('footer', {
        url: "/footer",
        controller: 'HomeCtrl',
        templateUrl: "views/footer.html"
      })
      .state('404', {
        url: "/404",
        templateUrl: "views/404.html",
        controller: function($scope) {}
      });

    $locationProvider.html5Mode(true);
  }]);
})();

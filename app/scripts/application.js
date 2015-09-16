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
  'ui.router'
]);


window.app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/404");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "views/home.html"
    })
    .state('404', {
      url: "/404",
      templateUrl: "views/404.html",
      controller: function($scope) {}
    });

  $locationProvider.html5Mode(true);
}]);

angular.module('vvida.controllers')
  .controller('LoginCtrl', ['$scope', 'Users', '$window', function($scope, Users, $window) {
    // login
    $scope.login = function() {
      Users.login($scope.user, function(err, res) {
        console.log(err, res);
      });
    };

    // signup
    $scope.signup = function() {
      Users.save($scope.user, function(err, user) {
        console.log(user);
      });
    };

    $scope.facebook = function() {
      $window.location.href = '/auth/facebook';
    };

    $scope.google = function() {
      $window.location.href = '/auth/google';
    };

  }]);

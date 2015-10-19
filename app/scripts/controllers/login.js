angular.module('vvida.controllers')
  .controller('LoginCtrl', ['$scope', 'Users','$window', function($scope, Users, $window) {
    $scope.login = function() {
      Users.login($scope.user, function(err, res) {
        console.log(err, res);
      });
    };

    $scope.facebook = function() {
      $window.location.href = '/auth/facebook';
    };

    $scope.google = function() {
      $window.location.href = '/auth/google';
    };

  }]);

angular.module('vvida.controllers')
  .controller('LoginCtrl', ['$scope', 'UserResource', function($scope, UserResource) {
    // login
    $scope.login = function() {
      UserResource.login($scope.user, function(err, res) {
        console.log(err, res);
      });
    };
    // signup
    $scope.signup = function() {
      UserResource.save($scope.user, function(err, user) {
        console.log(user);
      });
    };
  }]);
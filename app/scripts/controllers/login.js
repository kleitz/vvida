angular.module('vvida.controllers')
  .controller('LoginCtrl', ['$scope', 'Users', function($scope, Users) {
    // login
    $scope.login = function() {

      Users.login($scope.user, function(err, res) {
        console.log(err, res);
      });
      // signup
      $scope.signup = function() {
        Users.save($scope.user, function(err, user) {
          console.log(user, err);
        });
      };
    };
  }]);

angular.module('vvida.controllers')
  .controller('LoginCtrl', ['$state','$scope', 'Users', function($state,$scope, Users) {
    // login
    $scope.login = function() {
      Users.login($scope.user, function(err, res) {
        console.log('Err: ', err, 'Res ', res);
        if(!err) {
          $state.go('home');
        } else {
          $scope.message = err.error || err;
        }
      });
    };
    // signup
    $scope.signup = function() {
      Users.save($scope.user, function(err, user) {
        console.log(user, err);
      });
    };
  }]);

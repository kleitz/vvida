angular.module('vvida.controllers')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$state', 'Users', function($rootScope, $scope, $state, Users) {
    // login
    $scope.login = function() {
      Users.login($scope.user, function(err, res) {
        console.log('Err: ', err, 'Res ', res);
        if (!err) {
          $rootScope.currentUser = res;
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

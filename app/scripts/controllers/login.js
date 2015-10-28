angular.module('vvida.controllers')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$state', 'Users', '$window',
    function($rootScope, $scope, $state, Users, $window) {
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
          console.log(user);
        });
      };

      $scope.facebook = function() {
        $window.location.href = '/auth/facebook';
      };

      $scope.google = function() {
        $window.location.href = '/auth/google';
      };

    }
  ]);

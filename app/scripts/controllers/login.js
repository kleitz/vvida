angular.module('vvida.controllers')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$state', 'Users',
    function($rootScope, $scope, $state, Users) {
      // login
      $scope.login = function() {
        Users.login($scope.user, function(err, res) {
          if (!err) {
            $rootScope.currentUser = res;
            $state.go('home');
          } else {
            $scope.messageLogin = err.error || err;
          }
        });
      };
      // signup
      $scope.signup = function() {
        if ($scope.user.passwordSignup.trim() === $scope.user.confirmPassword.trim()) {
          var theUser={email: $scope.user.emailSignup ,password: $scope.user.passwordSignup};
          Users.save(theUser, function(res) {
            if (res) {
              $rootScope.currentUser = res;
              $state.go('profile');
            } else {
              $scope.messageSignup = err.error || err || error;
            }
          });
        } else {
          $scope.messageSignup = 'Your confirmation password does not match the initial password you have given.';
        }
      };
    }
  ]);

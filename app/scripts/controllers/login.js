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
        if ($scope.user.passwordSignup.trim().length < 8) {
          $scope.messageSignup =
            'Your password needs to have a length greater than 8 characters';
        } else if (!/\d/.test($scope.user.passwordSignup.trim()) ||
          !/\w/.test($scope.user.passwordSignup.trim())) {
          $scope.messageSignup =
            'Your password need to contain both numbers and non-word characters';
        } else if (!/[A-Z]/.test($scope.user.passwordSignup.trim()) ||
          !/[a-z]/.test($scope.user.passwordSignup.trim())) {
          $scope.messageSignup =
            'Your password need to contain both uppercase and lower characters';
        } else if ($scope.user.passwordSignup.trim() === $scope.user.confirmPassword.trim()) {
          var user = {
            email: $scope.user.emailSignup,
            password: $scope.user.passwordSignup
          };
          Users.save(user, function(res) {
            $rootScope.currentUser = res;
            console.log('$rootScope.currentUser: ', $rootScope.currentUser);
            $state.go('profile', {
              id: $rootScope.currentUser.id
            });
          }, function(err) {
            console.log(err);
            $scope.messageSignup = err.data.error;
          });
        } else {
          $scope.messageSignup =
            'Your confirmation password does not match the initial password you have given.';
        }
      };
    }
  ]);

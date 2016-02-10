angular.module('vvida.controllers')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$state',
    '$window', 'Users', 'Auth',
    function($rootScope, $scope, $state, $window, Users, Auth) {
      // login
      $scope.login = function() {
        Users.login($scope.user, function(err, res) {
          if (!err) {
            Auth.setToken(res.token);
            var user = {};
            user.name = res.name;
            user.img_url = res.img_url;
            $rootScope.currentUser = user;
            var goTo = $rootScope.intendedState || 'welcome';
            $state.go(goTo);
          } else {
            $scope.messageLogin = err.error || err || err[0].message;
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
            'Your password need to contain both numbers ' +
            'and non-word characters';
        } else if (!/[A-Z]/.test($scope.user.passwordSignup.trim()) ||
          !/[a-z]/.test($scope.user.passwordSignup.trim())) {
          $scope.messageSignup =
            'Your password need to contain both uppercase and lower characters';
        } else if ($scope.user.passwordSignup.trim() ===
          $scope.user.confirmPassword.trim()) {
          var user = {
            email: $scope.user.emailSignup,
            password: $scope.user.passwordSignup
          };
          Users.save(user, function(res) {
            Auth.setToken(res.token);
            $rootScope.currentUser = res;
            $state.go('profile', {
              id: $rootScope.currentUser.id
            });
          }, function(err) {
            $scope.messageSignup = err.data.error[0].message;
          });
        } else {
          $scope.messageSignup =
            'Your confirmation password does not match ' +
            ' the initial password you have given.';
        }
      };

      $scope.facebook = function() {
        $window.location.href = '/auth/facebook';
      };

      $scope.google = function() {
        $window.location.href = '/auth/google';
      };
    }
  ]);

angular.module('vvida.controllers')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$state', '$window', '$http', 'Users', 'Auth',
    function($rootScope, $scope, $state, $window, $http, Users, Auth) {
      // login
      $scope.login = function() {
        Users.login($scope.user, function(err, res) {
          if (!err) {
            Auth.setToken(res.token);
            $rootScope.currentUser = res;
            $state.go('welcome');
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
            Auth.setToken(res.token);
            $rootScope.currentUser = res;
            console.log('$rootScope.currentUser: ', $rootScope.currentUser);
            $state.go('profile', {
              id: $rootScope.currentUser.id
            });
          }, function(err) {
            console.log(err);
            $scope.messageSignup = err.data.error[0].message;
          });
        } else {
          $scope.messageSignup =
            'Your confirmation password does not match the initial password you have given.';
        }
      };

      $scope.facebook = function() {
        console.log("facebook");
        $http.post('/auth/facebook')
          .success(function(res) {
            console.log(res);
          })
          .error(function(err) {
            console.log(err);
          });
      };

      $scope.google = function() {
        $window.location.href = '/auth/google';
      };
    }
  ]);

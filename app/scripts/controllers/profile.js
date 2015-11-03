angular.module('vvida.controllers')
  .controller('ProfileCtrl', ['$rootScope', '$scope', '$state', 'Users',
    function($rootScope, $scope, $state, Users) {
      if ($rootScope.currentUser) {
        Users.countries(function(err, res) {
          if (res) {
            $scope.countries = res;
          } else {
            $scope.countries = [{
              name: 'No countries available.'
            }];
          }
        });
        $scope.user = {};
        $scope.user.id = $rootScope.currentUser.id;
        $scope.user.country = 'Kenya';
        $scope.user.email = $rootScope.currentUser.email;

        $scope.editProfile = function() {
          $scope.user.password = $rootScope.currentUser.password;
          $scope.user.dob = new Date(($scope.theDate).getUTCFullYear(), ($scope.theDate).getUTCMonth(),
            ($scope.theDate).getUTCDate(), ($scope.theDate).getUTCHours(), ($scope.theDate).getUTCMinutes(),
            ($scope.theDate).getUTCSeconds());
          if (!$rootScope.currentUser) {
            $state.go('404');
          } else {
            Users.update($scope.user, function() {
              $rootScope.currentUser = $scope.user;
              $scope.message =
                'You have successfully updated your profile. Click on the home button to get to vvida homepage.';
            }, function() {
              $scope.message =
                'There was a problem updating your profile.';
            });
          }

        };
      } else {
        $state.go('login');
      }
    }
  ]);

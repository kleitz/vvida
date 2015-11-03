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

        $scope.user = {
          id: $rootScope.currentUser.id,
          country: 'Kenya',
          email: $rootScope.currentUser.email
        };

        $scope.editProfile = function() {
          $scope.user.password = $rootScope.currentUser.password;

          var Year = ($scope.theDate).getUTCFullYear(),
            Month = ($scope.theDate).getUTCMonth(),
            Day = ($scope.theDate).getUTCDate(),
            Hour = ($scope.theDate).getUTCHours(),
            min = ($scope.theDate).getUTCMinutes(),
            seconds = ($scope.theDate).getUTCSeconds();
          $scope.user.dob = new Date(Year, Month, Day, Hour, min, seconds);

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

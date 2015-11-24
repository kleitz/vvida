angular.module('vvida.controllers')
  .controller('ProfileCtrl', ['$rootScope', '$scope', '$state', 'Users', 'Countries', 'FileUploader', 'Utils',
    function($rootScope, $scope, $state, Users, Countries, FileUploader, Utils) {

      var init = function() {
        $scope.user = {
          id: $rootScope.currentUser.id
        };
        $scope.uploader = new FileUploader({
          url: '/api/users/image-upload',
          alias: 'photos',
          formData: [$scope.user],
        });
      };

      $scope.showToast = function() {
        Utils.toast('Upload complete');
      };

      $scope.upload = function() {
        $scope.uploader.uploadAll();
      };

      init();

      if ($rootScope.currentUser) {
        Countries.getCountries(function(err, res) {
          if (res) {
            $scope.countries = res;
          } else {
            $scope.countries = [{
              name: 'No countries available.'
            }];
          }
        });
        $scope.user = $rootScope.currentUser;
        $scope.user.id = $rootScope.currentUser.id;
        $scope.user.country = $rootScope.currentUser.country || 'Kenya';
        $scope.user.email = $rootScope.currentUser.email;
        $scope.user.gender = $rootScope.currentUser.gender;

        $scope.editProfile = function() {
          $scope.user.password = $rootScope.currentUser.password;
          $scope.user.dob = new Date($scope.theDate);
          Users.update($scope.user, function() {
            var token = $rootScope.currentUser.token;
            $rootScope.currentUser = $scope.user;
            $rootScope.currentUser.token = token;
            $scope.message =
              'You have successfully updated your profile. Click on the home button to get to vvida homepage.';
          }, function() {
            $scope.message =
              'There was a problem updating your profile.';
          });
        };
      }
    }
  ]);

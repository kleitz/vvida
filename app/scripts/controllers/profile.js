angular.module('vvida.controllers')
  .controller('ProfileCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    'Users',
    'Countries',
    'FileUploader',
    'Utils',
    function($rootScope, $scope, $state, Users, Countries,
      FileUploader, Utils) {
      $scope.init = function() {
        $scope.uploader = new FileUploader({
          url: '/api/users/image-upload',
          alias: 'photos',
          formData: [
            $rootScope.currentUser
          ]
        });

        Countries.all(function(err, res) {
          if (res) {
            $scope.countries = res;
          } else {
            $scope.countries = [{
              name: 'No countries available.'
            }];
          }
        });

        $scope.uploader.onCompleteItem =
          function(fileItem, response, status, headers) {
            if (fileItem && status == 200 && headers) {
              $rootScope.currentUser.img_url = response;
            }
          };

        $scope.$on('session_found', function(events, user) {
          $rootScope.currentUser.dob = new Date(Date.parse(user.dob));
        });

        $scope.gender = [{
          type: 'Female'
        }, {
          type: 'Male'
        }, {
          type: 'Hidden'
        }];
      };


      $scope.showToast = function() {
        Utils.toast('Upload complete');
      };

      $scope.upload = function() {
        $scope.uploader.uploadAll();
      };

      $scope.editProfile = function() {
        $rootScope.currentUser.dob = new Date($rootScope.currentUser.dob);
        Users.update($rootScope.currentUser, function() {
          $scope.message =
            'You have successfully updated your profile. ' +
            'Click on the home button to get to vvida homepage.';

        }, function() {
          $scope.message =
            'There was a problem updating your profile.';
        });
      };

      $scope.init();
    }
  ]);

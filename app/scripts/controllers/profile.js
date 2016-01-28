angular.module('vvida.controllers')
  .controller('ProfileCtrl',
    ['$rootScope', '$scope', '$state', 'Users', 'Countries',
    'FileUploader', 'Utils',
    function($rootScope, $scope, $state, Users, Countries,
      FileUploader, Utils) {
      var init = function() {
        $scope.uploader = new FileUploader({
          url: '/api/users/image-upload',
          alias: 'photos',
          formData: [$rootScope.currentUser]
        });
      };
      init();
      $scope.uploader.onCompleteItem =
        function(fileItem, response, status, headers) {
          if (fileItem && status == 200 && headers) {
            $rootScope.currentUser.img_url = response;
          }
        };

      $scope.$on('session_found', function(events, user) {
        $rootScope.currentUser.dob = new Date(Date.parse(user.dob));
      });

      $scope.showToast = function() {
        Utils.toast('Upload complete');
      };
      $scope.upload = function() {
        $scope.uploader.uploadAll();
      };
      $scope.gender = [{
        type: 'female'
      }, {
        type: 'male'
      }, {
        type: 'hidden'
      }];

      Countries.getCountries(function(err, res) {
        if (res) {
          $scope.countries = res;
        } else {
          $scope.countries = [{
            name: 'No countries available.'
          }];
        }
      });

      $scope.editProfile = function() {
        $rootScope.currentUser.dob = new Date($rootScope.currentUser.dob);
        delete $rootScope.currentUser.password;
        delete $rootScope.currentUser.token;
        delete $rootScope.currentUser.facebook_auth_id;
        delete $rootScope.currentUser.facebook_auth_token;
        delete $rootScope.currentUser.img_public_id;
        delete $rootScope.currentUser.google_auth_id;
        delete $rootScope.currentUser.google_auth_token;
        Users.update($rootScope.currentUser, function() {
          var token = $rootScope.currentUser.token;
          $rootScope.currentUser.token = token;
          $scope.message =
            'You have successfully updated your profile. ' +
            'Click on the home button to get to vvida homepage.';

        }, function() {
          $scope.message =
            'There was a problem updating your profile.';
        });
      };
    }
  ]);

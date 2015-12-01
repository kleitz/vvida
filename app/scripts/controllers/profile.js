angular.module('vvida.controllers')
  .controller('ProfileCtrl', ['$rootScope', '$scope', '$state', '$interval', 'Users', 'Countries', 'FileUploader', 'Utils',
    function($rootScope, $scope, $state, $interval, Users, Countries, FileUploader, Utils) {
      var init = function() {
        $scope.uploader = new FileUploader({
          url: '/api/users/image-upload',
          alias: 'photos',
          formData: [$rootScope.currentUser]
        });
      };
      init();
      $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
        if (fileItem && status == 200 && headers) {
          $rootScope.currentUser.img_url = response;
        }
      };

      $interval(function() {
        if ($rootScope.currentUser) {
          $scope.user = $rootScope.currentUser;
          $scope.user.dob = new Date(Date.parse($scope.user.dob));
        }
      }, 1000, 2);



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
        $scope.user.dob = new Date($scope.user.dob);
        delete $scope.user.password;
        delete $scope.user.token;
        delete $scope.user.facebook_auth_id;
        delete $scope.user.facebook_auth_token;
        delete $scope.user.img_public_id;
        delete $scope.user.google_auth_id;
        delete $scope.user.google_auth_token;
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
  ]);

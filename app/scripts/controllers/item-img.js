(function() {
  'use strict';
  angular.module('vvida.controllers')
    .controller('ItemsImgCtrl', ['$scope', '$stateParams', 'Categories', 'FileUploader', 'Utils',
      function($scope, $stateParams, Categories, FileUploader, Utils) {
        var init = function() {
          $scope.itemId = {
            id: $stateParams.id
          };
          $scope.uploader = new FileUploader({
            url: '/api/image/',
            alias: 'photos',
            formData: [$scope.itemId],
          });
        };

        $scope.showToast = function() {
          Utils.toast('Upload complete');
        };

        $scope.upload = function() {
          $scope.uploader.uploadAll();
        };

        $scope.compare = function() {
          if (uploader.progress === 100) {
            Utils.toast("Upload complete");
          }
        };

        init();
        console.log($scope.uploader.progress);
      }
    ]);
})();

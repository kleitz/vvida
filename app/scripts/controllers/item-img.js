(function() {
  'use strict';
  angular.module('vvida.controllers')
    .controller('ItemsImgCtrl', ['$scope', '$stateParams', 'Categories', 'FileUploader', 'Utils',
      function($scope, $stateParams, Categories, FileUploader, Utils) {
        console.log($stateParams.id);
        var init = function() {
          $scope.itemId = {
            id: $stateParams.id
          };
          $scope.uploader = new FileUploader({
            url: '/api/image/',
            alias: 'photos',
            formData: [$scope.itemId],
          });
          $scope.uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/ , options) {
              return this.queue.length < 10;
            }
          });

          $scope.uploader.onSuccessItem(function(response, status, headers) {
            console.log(response, status, headers, 'Success');
          });

          $scope.uploader.onErrorItem(function(response, status, headers) {
            console.log(response, status, headers, 'Error');
          });

          $scope.uploader.onProgressAll(function(response) {
            console.log(response, 'progress');
          });

          $scope.uploader.onCompleteAll(function(response) {
            console.log(response, 'complete');
          });
        };
        $scope.upload = function() {
          console.log($scope.uploader);
          $scope.uploader.uploadAll(function(err, image) {
            console.log(err, image);
          });
        };

        init();
      }
    ]);
})();

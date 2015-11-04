(function() {
  'use strict';

  angular.module('vvida.controllers')
    .controller('ItemsCtrl', ['$timeout', '$scope', 'Categories', 'FileUploader', 'Utils', function($timeout, $scope, Categories, FileUploader, Utils) {

      var init = function() {
        $scope.item = {};
        $scope.uploader = new FileUploader({
          url: '/api/items/8',
          alias: 'photos',
          formData: [$scope.item]
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

      $scope.loadCategories = function() {
        $scope.categories = Categories.query();
      };

      $scope.addItems = function() {
        console.log($scope.uploader);
        $scope.uploader.uploadAll();
      };

      init();
      // $scope.fileSelected = function(files) {
      //   $scope.files = files;
      // };

      // $scope.addItems = function() {
      //   var item = {
      //     id: $scope.item.catId,
      //     name: $scope.item.name,
      //     description: $scope.item.description,
      //   };

      // $upload.upload({
      //   url: '/api/items/8',
      //   data: item,
      //   photos: $scope.files
      // }).progress(function(evt) {
      //   $scope.loading = true;
      // }).success(function(data) {
      //   $scope.loading = false;
      //   Utils.toast.success('Recipe successfully added and will be visible to others after approval');
      // });

    }]);
})();

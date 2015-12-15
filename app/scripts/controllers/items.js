(function() {
  'use strict';
  angular.module('vvida.controllers')
    .controller('ItemCtrl', ['$scope', '$state', '$stateParams', 'Categories', 'FileUploader', 'Utils', 'Items',
      function($scope, $state, $stateParams, Categories, FileUploader, Utils, Items) {

        // load categories
        $scope.loadCategories = function() {
          $scope.categories = Categories.query();
        };

        $scope.addItems = function() {
          console.log($scope.item);
          Items.save($scope.item, function(item) {
            if (item) {
              $state.go('editItem', {
                id: item.id
              });
            } else {
              Utils.toast('Item not created');
            }
          });
        };

        var itemId = $stateParams.id;
        var init = function() {
          $scope.item = {
            id: $stateParams.id
          };
          $scope.uploader = new FileUploader({
            url: '/api/image/',
            alias: 'photos',
            formData: [$scope.item],
          });
        };

        //load the item
        if (itemId) {
          Items.get({
            id: itemId
          }, function(item) {
            $scope.images = item.Images;
            $scope.item = item;
          });
          Categories.get({
            id: itemId
          }, function(category));
        }

        $scope.updateItem = function() {
          Items.update($scope.item, function(item) {
            Utils.toast(item.message);
          });
        };


        $scope.showToast = function() {
          Utils.toast('Upload complete');
        };

        $scope.upload = function() {
          $scope.uploader.uploadAll();
        };

        init();
      }
    ]);
})();

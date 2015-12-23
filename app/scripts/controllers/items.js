(function() {
  'use strict';
  angular.module('vvida.controllers')
    .controller('ItemCtrl', ['$scope', '$state', '$stateParams', '$log', '$mdSidenav', 'Categories', 'FileUploader', 'Utils', 'Items',
      function($scope, $state, $stateParams, $mdSidenav, $log, Categories, FileUploader, Utils, Items) {

        $scope.recentItems = Items.query();
        $scope.categories = Categories.query();

        $scope.categoryId = $stateParams.catId;

        $scope.categoryItems = Categories.get({
          id: $stateParams.catId
        }) || undefined;

        // Close Left Side Nav bar
        $scope.close = function() {
          $mdSidenav('left').close()
            .then(function() {
              $log.debug("close LEFT is done");
            });
        };

        $scope.viewCategory = function(category) {
          $state.go('categoryItems', {
            id: category.id
          });

        };

        $scope.viewItem = function(item) {
          $state.go('viewItem', {
            id: item.id
          });
        };

        $scope.resetCat = function() {
          $state.go('items');
        };

        $scope.addItems = function() {
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
            $scope.category = item.Category.type;
            $scope.item = item;
          });
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

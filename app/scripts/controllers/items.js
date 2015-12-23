(function() {
  'use strict';
  angular.module('vvida.controllers')
    .controller('ItemCtrl', ['$scope', '$state', '$stateParams', '$mdSidenav',
      'Categories', 'FileUploader', 'Utils', 'Items',
      function($scope, $state, $stateParams, $mdSidenav,
        Categories, FileUploader, Utils, Items) {
        // Close Left Side Nav bar
        $scope.close = function() {
          $mdSidenav('left').close()
            .then(function() {});
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

        var init = function() {
          // get all categories          
          $scope.categories = Categories.query();

          // get Recent Items
          $scope.recentItems = Items.query();
          // get selected category id
          $scope.categoryId = $stateParams.id;
          // load the categoryItems
          $scope.categoryItems = Categories.get({
            id: $stateParams.id
          });

          // --- check necessity
          $scope.item = {
            id: $stateParams.id
          };

          $scope.uploader = new FileUploader({
            url: '/api/image/',
            alias: 'photos',
            formData: [$scope.item],
          });

          // get selected item id
          var itemId = $stateParams.id;

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
        };

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

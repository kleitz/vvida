(function() {
  'use strict';
  angular.module('vvida.controllers')
    .controller('ItemCtrl', ['$scope', '$state', '$stateParams', '$mdSidenav',
      'Categories', 'FileUploader', 'Utils', 'Items', 'Reviews', 'Images',
      function($scope, $state, $stateParams, $mdSidenav,
        Categories, FileUploader, Utils, Items, Reviews, Images) {
        // Close Left Side Nav bar
        $scope.close = function() {
          $mdSidenav('catNav').close();
        };

        $scope.toggleSidenav = function() {
          $mdSidenav('catNav').toggle();
        };

        $scope.range = function(n) {
          return new Array(n);
        };

        $scope.rate = function(n) {
          $scope.itemReview.rating = n;
        };

        $scope.maxReview = function(itemReviews) {
          return window._.max(itemReviews, function(review) {
            return review.rating;
          });
        };

        $scope.averageReview = function(itemReviews) {
          if (itemReviews) {
            var sum = 0;
            var count = 0;
            itemReviews.forEach(function(review) {
              sum += review.rating;
              count += 1;
            });
            return Math.round(sum / count) || 0;
          }
        };

        $scope.getCategory = function() {
          // load the categoryItems
          $scope.categoryItems = Categories.get({
            id: $scope.categoryId,
            model: 'Items'
          });
        };

        $scope.setImage = function(image) {
          $scope.selectedImage = image;
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

        $scope.addItemReview = function() {
          $scope.itemReview.itemId = $stateParams.id;
          Reviews.save($scope.itemReview, function(review) {
            if (review) {
              $scope.item.Reviews.push(review);
              $scope.itemReview = {};
            }
          });
        };

        $scope.getItem = function() {
          // get selected item id
          $scope.itemId = $stateParams.id;
          $scope.uploader = new FileUploader({
            url: '/api/image/',
            alias: 'photos',
            formData: [{
              id: $scope.itemId
            }],
            onCompleteItem: function() {
              Items.update($scope.item, function() {
                $state.go($state.current, {
                  id: $scope.itemId,
                  tabIndex: 1
                }, {
                  reload: true
                });
              });
            }
          });
          //load the item
          Items.get({
            id: $scope.itemId
          }, function(item) {
            $scope.images = item.Images;
            $scope.item = item;
          });
        };

        $scope.init = function() {
          // get all categories
          $scope.categories = Categories.query({
            type: 'Item'
          });
          // get Recent Items
          $scope.recentItems = Items.query();
          // get selected category id
          $scope.categoryId = $stateParams.catId;
          // initialize scope.item for model
          $scope.item = {};
          //initialize current tab
          $scope.tabIndex = $stateParams.tabIndex;
        };

        $scope.updateItem = function() {
          Items.update($scope.item, function(item) {
            $scope.getItem();
            Utils.toast(item.message);
          });
        };

        $scope.showToast = function() {
          Utils.toast('Upload complete');
        };

        $scope.upload = function() {
          $scope.uploader.uploadAll();
        };
        $scope.deleteImage = function(id) {
          Images.delete(id, function() {
            $state.go($state.current, {
              id: $scope.itemId,
              tabIndex: 2
            }, {
              reload: true
            });
          });
        };
        $scope.init();
      }
    ]);
})();

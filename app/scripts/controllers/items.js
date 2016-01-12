(function() {
  'use strict';
  angular.module('vvida.controllers')
    .controller('ItemCtrl', ['$scope', '$state', '$stateParams', '$mdSidenav',
      'Categories', 'FileUploader', 'Utils', 'Items', 'Reviews',
      function($scope, $state, $stateParams, $mdSidenav,
        Categories, FileUploader, Utils, Items, Reviews) {
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

        $scope.maxReview = function(itemReviews) {
          return _.max(itemReviews, function(review) {
            return review.rating;
          });
        };

        $scope.getCategory = function() {
          // load the categoryItems
          $scope.categoryItems = Categories.get({
            id: $scope.categoryId
          });
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
          $scope.categories = Categories.query();
          // get Recent Items
          $scope.recentItems = Items.query();
          // get selected category id
          $scope.categoryId = $stateParams.catId;
          // initialize scope.item
          $scope.item = {};
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

        $scope.init();
      }
    ]);
})();

angular.module('vvida.controllers')
  .controller('UserProductsCtrl', [
    '$scope',
    '$rootScope',
    '$state',
    '$stateParams',
    'Users',
    'Utils',
    'Items',
    'FileUploader',
    'Categories',
    '$mdDialog',
    function($scope, $rootScope, $state, $stateParams,
      Users, Utils, Items, FileUploader, Categories, $mdDialog) {

      $scope.init = function() {

        Users.items($rootScope.currentUser, function(err, res) {
          if (err) {
            $scope.message = 'Your products goes here.';
          } else {
            $scope.items = res;
            if (res.Items.length === 0) {
              $scope.message = 'Your products goes here.';
            }
          }
        });

        // get all categories
        $scope.categories = Categories.query({
          type: 'Item'
        });

      };

      // create an item
      $scope.addItem = function() {
        Items.save($scope.item, function(item) {
          if (item) {
            $mdDialog.cancel();
            $state.go('userProfile.editItem', {
              id: item.id
            });
          } else {
            Utils.toast('Item not created');
          }
        });
      };

      // get selected item id
      $scope.getItem = function() {
        $scope.itemId = $stateParams.id;
        $scope.uploader = new FileUploader({
          url: '/api/image/',
          alias: 'photos',
          formData: [{
            itemId: $scope.itemId,
            userId: $rootScope.currentUser.id
          }],
          onCompleteItem: function() {
            Items.update($scope.item, function() {
              $state.go($state.current, {
                id: $scope.itemId,
                userId: $rootScope.currentUser.id,
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
          $scope.item = item;
        });

        $scope.categories = Categories.query({
          type: 'Item'
        });
      };

      $scope.updateItem = function() {
        Items.update($scope.item, function(item) {
          $scope.getItem();
          Utils.toast(item.message);
        });
      };

      $scope.deleteItem = function(id) {
        Items.delete({
          id: id
        }, function(msg) {
          Utils.toast(msg.message);
          $state.go('userProfile.products', {}, { reload: true });
        });
      };

      $scope.showToast = function() {
        Utils.toast('Upload complete');
      };

      $scope.upload = function() {
        $scope.uploader.uploadAll();
      };

      $scope.parseDate = function(date) {
        return Utils.parseTime(date);
      };

      $scope.addItemModal = function(ev) {
        Utils.modal(ev, 'item', 'Create an Item');
      };
    }
  ]);

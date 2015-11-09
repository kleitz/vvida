(function() {
  'use strict';

  angular.module('vvida.controllers')
    .controller('ItemsCtrl', ['$timeout', '$scope', '$state', 'Categories', 'Items', 'Utils', function($timeout, $scope, $state, Categories, Items, Utils) {
      $scope.loadCategories = function() {
        $scope.categories = Categories.query();
      };
      $scope.addItems = function() {
        Items.save($scope.item, function(item) {
          if (item) {
            $state.go('itemImgUpload', {
              id: item.id
            });
          }
        });
      };
    }]);
})();

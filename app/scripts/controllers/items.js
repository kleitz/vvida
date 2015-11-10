(function() {
  'use strict';

  angular.module('vvida.controllers')
    .controller('ItemsCtrl', ['$timeout', '$scope', '$rootScope', '$state', 'Categories', 'Items', 'Utils',
      function($timeout, $scope, $rootScope, $state, Categories, Items, Utils) {
        if ($rootScope.currentUser) {
          $scope.loadCategories = function() {
            $scope.categories = Categories.query();
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
        } else {
          $state.go('login');
        }
      }
    ]);
})();

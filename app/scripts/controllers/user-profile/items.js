angular.module('vvida.controllers')
  .controller('UserProductsCtrl', ['$scope',
  '$rootScope',
  'Users',
  'ModalService',
  function($scope, $rootScope, Users, ModalService) {
    if ($rootScope.currentUser) {
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
    }

    $scope.addItemModal = function(ev) {
      ModalService(ev, 'item', 'Create an Item');
    };

  }]);

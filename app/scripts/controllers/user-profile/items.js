angular.module('vvida.controllers')
  .controller('UserProductsCtrl', ['$scope',
  '$rootScope',
  'Users',
  'Utils',
  function($scope, $rootScope, Users, Utils) {
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
      Utils.modal(ev, 'item', 'Create an Item');
    };

  }]);

angular.module('vvida.controllers')
  .controller('UserProductsCtrl', ['$scope', '$rootScope', 'Users', function($scope, $rootScope, Users) {
    $scope.init = function() {
      Users.items($rootScope.currentUser, function(err, res) {
        if (err) {
          $scope.message = 'Could not get products.';
        } else {
          $scope.items = res.Items;
          if ($scope.items.length === 0) {
            $scope.message = 'No products have been created.';
          }
        }
      });
    };
  }]);

angular.module('vvida.controllers')
  .controller('UserProductsCtrl', ['$scope', '$rootScope', 'Users', function($scope, $rootScope, Users) {
    if ($rootScope.currentUser) {
      Users.items($rootScope.currentUser, function(err, res) {
        if (err) {
          $scope.message = 'No products have been created.';
        } else {
          $scope.items = res;
          if (res.Items.length === 0) {
            $scope.message = 'No products have been created.';
          }
        }
      });
    }
  }]);

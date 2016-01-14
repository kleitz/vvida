angular.module('vvida.controllers')
  .controller('UserReviewsCtrl', ['$scope', '$rootScope', 'Users', function($scope, $rootScope, Users) {
    $scope.init = function() {
      Users.reviews($rootScope.currentUser, function(err, res) {
        if (err) {
          $scope.message = 'Could not get reviews.';
        } else {
          $scope.reviews = res.Reviews;
          if ($scope.reviews.length === 0) {
            $scope.message = 'No reviews have been created.';
          }
        }
      });

      $scope.rateThis = function(num) {
        var array = new Array(num);
        for (var x = 0; x < array.length; x++) {
          array[x] = 1;
        }
        return array;
      };
    }
  }]);

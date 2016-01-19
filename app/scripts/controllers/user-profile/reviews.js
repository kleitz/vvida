angular.module('vvida.controllers')
  .controller('UserReviewsCtrl', ['$scope', '$rootScope', 'Users', function($scope, $rootScope, Users) {
    if ($rootScope.currentUser) {
      Users.reviews($rootScope.currentUser, function(err, res) {
        if (err) {
          $scope.message = 'No reviews have been made.';
        } else {
          $scope.reviews = res;
          if (res.Reviews.length === 0) {
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

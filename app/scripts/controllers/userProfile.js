angular.module('vvida.controllers')
  .controller('UserProfileCtrl', ['$scope', '$rootScope', '$state', 'Users', function($scope, $rootScope, $state, Users) {
    if (!$rootScope.currentUser) {
      $state.go('login');
    } else {
      Users.eventsCount(function(err, res) {
        if (err) {
          $scope.eventsCount = 0;
        } else {
          $scope.eventsCount = res;
        }
      });
      Users.itemsCount(function(err, res) {
        if (err) {
          $scope.itemsCount = 0;
        } else {
          $scope.itemsCount = res;
        }
      });
      Users.reviewsCount(function(err, res) {
        if (err) {
          $scope.reviewsCount = 0;
        } else {
          $scope.reviewsCount = res;
        }
      });
    }
  }])
  .controller('UserEventsCtrl', ['$scope', 'Users', function($scope, Users) {
    Users.events(function(err, res) {
      if (err) {
        $scope.message = 'No events have been created.';
      } else {
        $scope.events = res;
        if (res.Events.length === 0) {
          $scope.message = 'No events have been created.';
        }
      }
    });
    $scope.parseDate = function(date) {
      return new Date(Date.parse(date)).toUTCString();
    };
  }])
  .controller('UserReviewsCtrl', ['$scope', 'Users', function($scope, Users) {
    Users.reviews(function(err, res) {
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
  }])
  .controller('UserProductsCtrl', ['$scope', 'Users', function($scope, Users) {
    Users.items(function(err, res) {
      if (err) {
        $scope.message = 'No products have been created.';
      } else {
        $scope.items = res;
        if (res.Items.length === 0) {
          $scope.message = 'No products have been created.';
        }
      }
    });
  }])
  .controller('UserPicturesCtrl', ['$scope', function($scope) {
    $scope.arrayNo = function(num) {
      var array = new Array(num);
      for (var x = 0; x < array.length; x++) {
        array[x] = 1;
      }
      return array;
    };
  }]);

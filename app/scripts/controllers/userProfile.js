angular.module('vvida.controllers')
  .controller('MainProfileCtrl', ['$scope', '$rootscope', function($scope, $rootscope) {
    if ($rootscope.currentUser) {
      console.log('');
    } else {
      $state.go('login');
    }
  }])
  .controller('UserProfileCtrl', ['$scope', '$rootscope', 'Users', function($scope, $rootscope, Users) {

  }])
  .controller('UserEventsCtrl', ['$scope', 'Users', function($scope, Users) {
    Users.events(null, function(err, res) {
      if (err) {
        $scope.message = 'No events have been created.';
      } else {
        $scope.events = res;
        console.log(res);
      }
    });
    $scope.parseDate = function(date) {
      return new Date(Date.parse(date)).toUTCString();
    };
  }])
  .controller('UserReviewsCtrl', ['$scope', 'Users', function($scope, Users) {
    Users.reviews(null, function(err, res) {
      if (err) {
        $scope.message = 'No reviews have been made.';
      } else {
        $scope.reviews = res;
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
    Users.items(null, function(err, res) {
      if (err) {
        $scope.message = 'No products have been created.';
      } else {
        $scope.items = res;
      }
    });
  }])
  .controller('UserPicturesCtrl', ['$scope', function($scope) {

  }]);

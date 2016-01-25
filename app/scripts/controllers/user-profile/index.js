angular.module('vvida.controllers')
  .controller('UserProfileCtrl', ['$scope', '$rootScope', '$state', 'Users',
    function($scope, $rootScope, $state, Users) {
    $scope.init = function() {
        Users.eventsCount($rootScope.currentUser, function(err, res) {
          if (err) {
            $scope.eventsCount = 0;
          } else {
            $scope.eventsCount = res;
          }
        });
        Users.itemsCount($rootScope.currentUser, function(err, res) {
          if (err) {
            $scope.itemsCount = 0;
          } else {
            $scope.itemsCount = res;
          }
        });
        Users.reviewsCount($rootScope.currentUser, function(err, res) {
          if (err) {
            $scope.reviewsCount = 0;
          } else {
            $scope.reviewsCount = res;
          }
        });
      }
    }
  ]);

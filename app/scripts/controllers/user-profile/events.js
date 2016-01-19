angular.module('vvida.controllers')
  .controller('UserEventsCtrl', ['$scope', '$rootScope', 'Users', function($scope, $rootScope, Users) {
    $scope.init = function() {
      Users.events($rootScope.currentUser, function(err, res) {
        if (err) {
          $scope.message = 'Could not get events.';
        } else {
          $scope.events = res.Events;
          if ($scope.events.length === 0) {
            $scope.message = 'No events have been created.';
          }
        }
      });
    };
      $scope.parseDate = function(date) {
        return new Date(Date.parse(date)).toUTCString();
      };
  }]);

angular.module('vvida.controllers')
  .controller('UserEventsCtrl', ['$scope', '$rootScope', 'Users', function($scope, $rootScope, Users) {
    if ($rootScope.currentUser) {
      Users.events($rootScope.currentUser, function(err, res) {
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
    }
  }]);

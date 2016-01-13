angular.module('vvida.controllers')
  .controller('UserEventsCtrl', [
    '$scope',
    '$rootScope',
    '$state',
    'Users',
    'modalService',
    function($scope, $rootScope, $state, Users, modalService) {

      if ($rootScope.currentUser) {
        Users.events($rootScope.currentUser, function(err, res) {
          if (err) {
            $scope.message = 'Your events goes here.';
          } else {
            $scope.events = res;
            if (res.Events.length === 0) {
              $scope.message = 'Your events goes here.';
            }
          }
        });

        $scope.parseDate = function(date) {
          return new Date(Date.parse(date)).toUTCString();
        };
      }

      $scope.addEventModal = function(ev) {
        modalService(ev, 'events', 'Create an Event');
      };
    }
  ]);

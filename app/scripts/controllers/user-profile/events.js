angular.module('vvida.controllers')
  .controller('UserEventsCtrl', [
    '$scope',
    '$rootScope',
    '$state',
    'Users',
    'Utils',
    'Events',
    function($scope, $rootScope, $state, Users, Utils, Events) {

      $scope.init = function() {
        $scope.event = {};
        // Lists of fruit names and Vegetable objects
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
      };

      // create event
      $scope.addEvent = function() {
        Events.save($scope.event, function(event) {
          if (event) {
            $state.go('userProfile.editEvent', {
              id: event.id
            });
          } else {
            Utils.toast('Event not created');
          }
        });
      };

      $scope.parseDate = function(date) {
        return new Date(Date.parse(date)).toUTCString();
      };

      $scope.addEventModal = function(ev) {
        Utils.modal(ev, 'event', 'Create an Event');
      };
    }
  ]);

angular.module('vvida.controllers')
  .controller('UserEventsCtrl', [
    '$scope',
    '$rootScope',
    '$state',
    '$stateParams',
    'Users',
    'Utils',
    'Events',
    'FileUploader',
    function($scope, $rootScope,
      $state, $stateParams, Users, Utils, Events, FileUploader) {

      $scope.init = function() {
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

      $scope.getEvent = function() {
        $scope.eventId = $stateParams.id;
        $scope.uploader = new FileUploader({
          url: '/api/image/',
          alias: 'photos',
          formData: [{
            eventId: $scope.eventId
          }],
        });
        Events.get({
          id: $stateParams.id
        }, function(event) {
          console.log(event);
          $scope.event = event;
        });
      };

      $scope.updateEvent = function() {
        Events.update($scope.event, function(event) {
          Utils.toast(event.message);
        });
      };

      $scope.showToast = function() {
        Utils.toast('Upload complete');
      };

      $scope.upload = function() {
        $scope.uploader.uploadAll();
      };

      $scope.parseDate = function(date) {
        return new Date(Date.parse(date)).toUTCString();
      };

      $scope.addEventModal = function(ev) {
        Utils.modal(ev, 'event', 'Create an Event');
      };
    }
  ]);

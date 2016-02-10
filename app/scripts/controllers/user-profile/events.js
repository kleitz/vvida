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
    'Categories',
    '$mdDialog',
    function($scope, $rootScope,
      $state, $stateParams, Users, Utils, Events,
      FileUploader, Categories, $mdDialog) {

      $scope.init = function() {

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
        // get all categories
        $scope.categories = Categories.query({
          type: 'Event'
        });
      };
      // $scope.init();

      // create event
      $scope.addEvent = function() {
        Events.save($scope.event, function(event) {
          if (event) {
            $mdDialog.cancel();
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
          onCompleteItem: function() {
            Events.update($scope.event, function() {
              $state.go($state.current, {
                id: $scope.eventId,
                tabIndex: 1
              }, {
                reload: true
              });
            });
          }
        });
        Events.get({
          id: $stateParams.id
        }, function(event) {
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

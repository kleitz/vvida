(function() {
  'use strict';
  angular.module('vvida.controllers')
    .controller('EventCtrl', ['$scope', '$state', '$stateParams', 'FileUploader', 'Utils', 'Events',
      function($scope, $state, $stateParams, FileUploader, Utils, Events) {
        // create event
        $scope.addEvent = function() {
          Events.save($scope.event, function(event) {
            if (event) {
              $state.go('editEvent', {
                id: event.id
              });
            } else {
              Utils.toast('Event not created');
            }
          });
        };

        //Get the eventId
        var init = function() {
          $scope.event = {
            eventId: $stateParams.id
          };

          $scope.readonly = false;
          // Initilize sponsors' list
          $scope.event.sponsors = [];
          $scope.date = new Date();
          $scope.uploader = new FileUploader({
            url: '/api/image/',
            alias: 'photos',
            formData: [$scope.event],
          });

          Events.query(function(events) {
            $scope.loadEvents = events;
          });
        };

        //view an event
        $scope.getEvent = function () {
          Events.get({
            id: $stateParams.id
          }, function(event) {
            $scope.event = event;
            $scope.event.time = null;
          });
        };

        $scope.setImage = function(image) {
          $scope.selectedImage = image;
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

        init();
      }
    ]);
})();

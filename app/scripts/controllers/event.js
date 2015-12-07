(function() {
  'use strict';
  angular.module('vvida.controllers')
    .controller('EventCtrl', ['$scope', '$state', '$stateParams',
      'FileUploader', 'Utils', 'Events',
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
        var eventId = $stateParams.id;
        var init = function() {
          $scope.event = {
            eventId: $stateParams.id
          };
          $scope.uploader = new FileUploader({
            url: '/api/image/',
            alias: 'photos',
            formData: [$scope.event],
          });
        };

        //load the item
        if (eventId) {
          Events.get({
            id: eventId
          }, function(event) {
            $scope.event = event;
            $scope.event.time = null;
          });
        }

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

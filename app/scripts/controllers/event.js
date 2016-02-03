(function() {
  'use strict';
  angular.module('vvida.controllers')
    .controller('EventCtrl', ['$scope', '$state', '$stateParams',
      'Utils', 'Events',
      function($scope, $state, $stateParams,
        Utils, Events) {

        // initialize state data
        $scope.init = function() {
          Events.query(function(events) {
            $scope.loadEvents = events;
          });
        };

        $scope.$watch(function() {
            return $state.current.name;
          },
          function(name) {
            if (name === 'events') {
              $scope.nextView = false;
            } else {
              $scope.nextView = true;
            }
          });

        $scope.getEvent = function() {
          $scope.eventId = $stateParams.id;
          Events.get({
            id: $stateParams.id
          }, function(event) {
            $scope.event = event;
          });
        };

        // format date data
        $scope.getTime = function(eventTime) {
          return Utils.parseTime(eventTime);
        };

        $scope.averageReview = function(eventReviews) {
          if (eventReviews) {
            var sum = 0,
              count = 0;
            eventReviews.forEach(function(review) {
              sum += review.rating;
              count += 1;
            });
            return Math.round(sum / count) || 0;
          }
        };

        $scope.setImage = function(image) {
          $scope.selectedImage = image;
        };

        $scope.init();
      }
    ]);
})();

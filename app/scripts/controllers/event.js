(function() {
  'use strict';
  angular.module('vvida.controllers')
    .controller('EventCtrl', ['$scope', '$state', '$stateParams', '$filter',
      'Utils', 'Events', 'Reviews',
      function($scope, $state, $stateParams, $filter,
        Utils, Events, Reviews) {

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

        $scope.range = function(n) {
          return new Array(n);
        };

        $scope.rate = function(n) {
          $scope.itemReview.rating = n;
        };

        $scope.addEventReview = function() {
          $scope.eventReview.eventId = $stateParams.id;
          Reviews.save($scope.eventReview, function(review) {
            if (review) {
              $scope.event.Reviews.push(review);
              $scope.eventReview = {};
            }
          });
        };

        $scope.averageReview = function(eventReviews) {
          if (eventReviews) {
            var sum = 0;
            eventReviews.forEach(function(review) {
              sum += review.rating;
            });
            return Math.round(sum / eventReviews.length) || 0;
          }
        };

        $scope.setImage = function(image) {
          $scope.selectedImage = image;
        };

        $scope.init();
      }
    ]);
})();

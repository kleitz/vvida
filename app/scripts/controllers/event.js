(function() {
  'use strict';
  angular.module('vvida.controllers')
    .controller('EventCtrl', ['$scope', '$state', '$stateParams', '$filter',
      '$mdSidenav', 'Utils', 'Events', 'Categories',
      function($scope, $state, $stateParams, $filter, $mdSidenav,
        Utils, Events, Categories) {

        // initialize state data
        $scope.init = function() {

          // get all categories
          $scope.categories = Categories.query({
            type: 'Event'
          });

          // get selected category id
          $scope.categoryId = $stateParams.catId;

          $scope.loadEvents = Events.query();

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
        };


        $scope.close = function() {
          $mdSidenav('evcatNav').close();
        };

        $scope.toggleSidenav = function() {
          $mdSidenav('evcatNav').toggle();
        };

        $scope.getCategory = function() {
          // load the categoryItems
          $scope.categoryEvents = Categories.get({
            id: $scope.categoryId,
            type: 'Events'
          });
        };

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

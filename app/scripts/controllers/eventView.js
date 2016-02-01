(function() {
  'use strict';
  angular.module('vvida.controllers')
    .controller('EventViewsCtrl', ['$scope', '$state', '$stateParams',
      'Utils', 'Events',
      function($scope, $state, $stateParams,
        Utils, Events) {

        // initialize state data

        $scope.init = function() {
          $scope.page = parseInt($stateParams.page) || 0;
          $scope.viewEvents($scope.page);
          $scope.viewType = $stateParams.view || 'grid';
        };

        // event list to be updated for pagination
        $scope.viewEvents = function(page) {
          var pageNum = parseInt(page);
          pageNum = (pageNum <= 0) ? 1 : pageNum;
          $scope.limit = 3;

          $scope.loadEvents = Events.query({
            limit: $scope.limit,
            page: pageNum - 1
          });
        };

        $scope.setViewType = function(type) {
          $scope.viewType = type;
          $scope.updateStateParams();
        };

        $scope.updateStateParams = function() {
          $state.go('events.all', {
            page: $scope.page,
            view: $scope.viewType
          });
        };
        // redirect to pages
        $scope.prevEvents = function() {
          $scope.page = parseInt($state.params.page) - 1;
          $scope.viewEvents($scope.page);
          $scope.updateStateParams();
        };

        $scope.nextEvents = function() {
          $scope.page = parseInt($state.params.page) + 1;
          $scope.viewEvents($scope.page);
          $scope.updateStateParams();
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

        $scope.init();
      }
    ]);
})();

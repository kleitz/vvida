(function() {
  'use strict';
  angular.module('vvida.controllers')
    .controller('EventViewsCtrl', ['$scope', '$state', '$stateParams',
      '$mdSidenav', 'Utils', 'Events', 'Categories',
      function($scope, $state, $stateParams,
        $mdSidenav, Utils, Events, Categories) {

        // initialize state data

        $scope.init = function() {
          $mdSidenav('evcatNav').close();
          $scope.page = parseInt($stateParams.page) || 0;
          $scope.viewType = $stateParams.view || 'grid';
          // get selected category id
          $scope.categoryId = $stateParams.catId;
          if ($scope.categoryId) {
            $scope.getCategory();
          } else {
            $scope.viewEvents($scope.page);
          }
        };


        // event list to be updated for pagination
        $scope.viewEvents = function(page) {
          $scope.limit = 3;
          var pageNum = parseInt(page);
          pageNum = (pageNum <= 0) ? 1 : pageNum;

          $scope.loadEvents = Events.query({
            limit: $scope.limit,
            page: pageNum - 1
          });
        };

        $scope.getCategory = function() {
          // load the categoryEvents
          Categories.get({
            id: $scope.categoryId,
            model: 'Events'
          }, function(category) {
            $scope.categoryName = category.name;
            $scope.loadEvents = category.Events;
          });

        };

        $scope.setViewType = function(type) {
          $scope.viewType = type;
          $scope.updateStateParams();
        };

        $scope.updateStateParams = function() {
          $state.go($state.current, {
            page: $scope.page,
            view: $scope.viewType,
            catId: $scope.categoryId
          });
        };
        // redirect to pages
        $scope.prevEvents = function() {
          $scope.page = parseInt($state.params.page) - 1;
          $scope.viewEvents($scope.page);
          $scope.nextButton = false;
          $scope.updateStateParams();
        };

        $scope.nextEvents = function() {
          $scope.page = parseInt($state.params.page) + 1;
          $scope.viewEvents($scope.page);
          $scope.updateStateParams();
        };

        $scope.disableNextButton = function() {
          $scope.limit = 3;
          Events.query({
            limit: $scope.limit,
            page: parseInt($scope.page)
          }, function(res) {
            if (res.length === 0) {
              $scope.nextButton = true;
            } else {
              $scope.nextButton = false;
            }
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

        $scope.init();
      }
    ]);
})();

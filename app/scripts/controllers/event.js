(function() {
  'use strict';
  angular.module('vvida.controllers')
    .controller('EventCtrl', ['$scope', '$state', '$stateParams', '$filter',
      'Utils', 'Events',
      function($scope, $state, $stateParams, $filter,
        Utils, Events) {


        // redirect to pages
        $scope.prevEvents = function() {
          var page = parseInt($scope.page) - 1;
          $state.go('events.all', {
            page: page
          });
        };

        $scope.nextEvents = function() {
          var page = parseInt($scope.page) + 1;
          $state.go('events.all', {
            page: page
          });
        };

        // event list to be updated for pagination
        $scope.viewEvents = function() {

          var pageNum = parseInt($state.params.page);
          pageNum = (pageNum <= 0) ? 1 : pageNum;
          $scope.limit = 3;

          Events.query({
            limit: $scope.limit,
            page: pageNum - 1
          }, function(events) {
            $scope.loadEvents = events;
          });

        };

        // initialize state data
        $scope.init = function() {
          $scope.page = $state.params.page || 0;
          $scope.loadEvents = Events.query();
          if (!$stateParams.page) {
            $scope.nextE = false;
          }

        };

        // format date data
        $scope.parseTime = function(eventTime) {
          return {
            day: $filter('date')(eventTime, 'EEEE dd MMM yyyy'),
            time: $filter('date')(eventTime, 'hh:mm a')
          };
        };

        $scope.init();
      }
    ]);
})();

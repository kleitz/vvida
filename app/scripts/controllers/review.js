(function() {
  'use strict';
  angular.module('vvida.controllers')
    .controller('ReviewCtrl', ['$scope', '$state', '$stateParams', 'Reviews', 'Categories', 'Utils',
      function($scope, $state, $stateParams, Categories, Utils, Reviews) {
        $scope.loadReviews = function() {
          $scope.reviews = Reviews.query();
        };
        console.log($scope.reviews);
      }
      ]);


})();
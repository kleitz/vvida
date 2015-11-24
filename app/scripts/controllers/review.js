(function() {
  'use strict';
  angular.module('vvida.controllers')
    .controller('ReviewCtrl', ['$scope', '$state', '$stateParams', 'Reviews', 'Categories', 'Utils',
      function($scope, $state, $stateParams, Categories, Utils, Reviews) {
        $scope.loadReviews = function() {
          console.log($scope.currentUser);
          $scope.reviews = Reviews.query();
        };
        $scope.user = $scope.currentUser.firstname;
        console.log($scope.reviews);
      }
      ]);


})();
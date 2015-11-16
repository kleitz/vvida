angular.module('vvida.controllers')
  .controller('HomeCtrl', ['$scope', 'Items', 'Events', 'Reviews', function($scope, Items, Events, Reviews) {
    $scope.header_image = 'images/vvidaLogo.png';
    // get all items
    $scope.items = Items.query();
    // Get all the events
    $scope.events = Events.query();
    // Get reviews from the db
    $scope.reviews = Reviews.query();
    console.log($scope.reviews);
  }]);

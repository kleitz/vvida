angular.module('vvida.controllers')
  .controller('HomeCtrl', ['$scope', 'Items', 'Events', function($scope, Items, Events) {
    $scope.header_image = 'images/vvidaLogo.png';
    // get all items
    $scope.items = Items.query();
    // Get all the events
    $scope.events = Events.query();

  }]);

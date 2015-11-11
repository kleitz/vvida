angular.module('vvida.controllers')
  .controller('HomeCtrl', ['$scope', 'Items', 'Events', function($scope, Items, Events) {
    $scope.header_image = 'images/vvidaLogo.png';

    $scope.items = Items.query();

    $scope.events = Events.query();
    console.log($scope.items);



  }]);

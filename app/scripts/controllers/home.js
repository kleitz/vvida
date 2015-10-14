angular.module('vvida.controllers')
  .controller('HomeCtrl', ['$scope', function($scope) {
    $scope.header_image = 'images/vvidaLogo.png';
  }]);

angular.module('vvida.controllers')
  .controller('HamburgerCtrl', function($scope, $mdSidenav) {
    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };
  });

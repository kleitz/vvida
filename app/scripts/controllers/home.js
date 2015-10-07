angular.module('vvida.controllers')
  .controller('HomeCtrl', ['$scope', function($scope) {
    $scope.header_image = 'images/vvidaLogo.png';
  }])
  .controller('LoginCtrl', ['$scope', function($scope) {
    $scope.userData = {
      firstName :'',
      lastName :'',
      email :'',
      password :''
    };
  }]);

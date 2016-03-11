angular.module('vvida.controllers')
  .controller('UserPicturesCtrl', ['$scope', function($scope) {
    $scope.init = function() {
      $scope.arrayNo = function(num) {
        var array = new Array(num);
        for (var x = 0; x < array.length; x++) {
          array[x] = 1;
        }
        return array;
      };
    };
  }]);

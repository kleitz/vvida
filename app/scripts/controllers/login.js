angular.module('vvida.controllers')
  .controller('LoginCtrl', ['$scope', 'Users', function($scope, Users) {
    $scope.login = function() {

      Users.login($scope.user, function(err, res) {
        console.log(err, res);
      });
    };
  }]);

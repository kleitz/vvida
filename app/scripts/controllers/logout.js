angular.module('vvida.controllers')
  .controller('LogoutCtrl', ['$scope', 'Users', function($scope, Users) {
    // logout
    $scope.logout = function(){
      Users.logout($scope.user, function(err, res) {
        console.log(err, res);
      });
    };
  }]);
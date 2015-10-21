angular.module('vvida.controllers')
  .controller('HeaderCtrl', ['$scope', 'Users', function($scope, Users) {
    // logout
    $scope.logout = function() {
      Users.logout($scope.user, function(err, res) {
        if (!err) {
          $state.go('home');
        } else {
          console.log(err, res);
        }
      });
    };
  }]);

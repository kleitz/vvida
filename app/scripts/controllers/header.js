angular.module('vvida.controllers')
  .controller('HeaderCtrl', ['$rootScope','$state','$scope', 'Users', function($state,$scope, Users,$rootScope) {
    // logout
    $scope.logout = function() {
      Users.logout($scope.user, function(err, res) {
        if (!err) {
          delete $rootScope.currentUser;
          $state.go('login');
        } else {
          console.log(err, res);
        }
      });
    };

  }]);

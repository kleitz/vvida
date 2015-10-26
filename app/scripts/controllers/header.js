angular.module('vvida.controllers')
  .controller('HeaderCtrl', ['$rootScope', '$scope', '$state', 'Users', function($rootScope, $scope, $state, Users) {
    // logout
    $scope.logout = function() {
      Users.logout($scope.user, function(err, res) {
        if (!err) {
          $rootScope.currentUser = {};
          $state.go('login');
        } else {
          console.log(err, res);
        }
      });
    };

  }]);

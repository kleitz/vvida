angular.module('vvida.controllers')
  .controller('HeaderCtrl', ['$rootScope', '$scope', '$cookies', '$state', 'Users',
    function($rootScope, $scope, $cookies, $state, Users) {
      // logout
      $scope.logout = function() {
        Users.logout($scope.user, function(err, res) {
          if (!err) {
            delete $rootScope.currentUser;
            $cookies.remove('vvidaUserPersisted');
            $state.go('login');
          } else {
            console.log(err, res);
          }
        });
      };

    }
  ]);

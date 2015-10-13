angular.module('vvida.controllers')
  .controller('LoginCtrl', ['$scope', 'Users', 'Auth', function($scope, Users) {
    $scope.login = function() {
      Auth.setUser(user); //Update the state of the user in the app
      Users.login($scope.user, function(err, res) {
        console.log(err, res);
      });
    };
  }]);

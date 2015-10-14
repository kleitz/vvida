angular.module('vvida.controllers')
  .controller('LoginCtrl', ['$scope', 'UserResource', function($scope, UserResource) {
    var users = new UserResource();
    // login
    $scope.login = function() {
      Auth.setUser(user); //Update the state of the user in the app
      Users.login($scope.user, function(err, res) {
        console.log(err, res);
      });
    };
    // signup
    $scope.signup = function() {
      users = new UserResource();
      users.$save($scope.user, function(err, user) {
        console.log(user);
      });
    };
  }]);

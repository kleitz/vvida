angular.module('vvida.controllers')
  .controller('LoginCtrl', ['$scope', 'Users', function($scope, Users) {
    var users = new Users();
    // login
    $scope.login = function() {
      Users.login($scope.user, function(err, res) {
        console.log(err, res);
      });
    };
    // signup
    $scope.signup = function() {

      var UserService = new UserService();
      UserService.getAllUsers();
    };
  }]);
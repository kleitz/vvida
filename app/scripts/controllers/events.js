angular.module('vvida.controllers')
  .controller('EventCtrl', ['$scope', 'Users', function($scope, Users) {
    // login
    $scope.users = function() {
     users = Users.getAllUsers;
    };
    // signup
    $scope.signup = function() {
      users = new UserResource();
      users.$save($scope.user, function(err, user) {
        console.log(user);
      });
    };
  }]);
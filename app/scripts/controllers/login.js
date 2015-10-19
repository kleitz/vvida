angular.module('vvida.controllers')
  .controller('LoginCtrl', ['$scope', 'UserResource', 'Auth', function($scope, UserResource, Auth) {
    $scope.authLogin = function() {
      Auth.setUser(user); //Update the state of the user in the app
    };
    // login
    $scope.login = function() {

      UserResource.login($scope.user, function(err, res) {
        console.log(err, res);
      });
      // signup
      $scope.signup = function() {
        UserResource.save($scope.user, function(err, user) {
          console.log(user, err);
        });
      };
    };
  }]);

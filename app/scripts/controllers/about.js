angular.module('vvida.controllers')
  .controller('AboutCtrl', ['$scope', 'Utils', 'Users', function($scope, Utils, Users) {
    var users = new Users();
    $scope.openDialog = function(event) {
      Utils.dialog('My name is a String', 'Hey there, I\'m a dialog', event,
        function() {
          console.log('Ok button has been clicked!');
        });
    };
    $scope.openToast = function() {
      Utils.toast('Hey there!');
    };

    $scope.users = function() {
     var data = users.getAllUsers;
     console.log(data);

    };
  }]);
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

    $scope.uploadFile = function() {
      $scope.fileSelected = function(files) {
        if (files && files.length) {
          $scope.file = files[0];
        }

        $upload.upload({
            url: '/api/upload', //node.js route
            file: $scope.file
          })
          .success(function(data) {
            console.log(data, 'uploaded');
          });
      };
    };
  }]);

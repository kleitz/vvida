
angular.module('vvida.controllers')
  .controller('UploadCtrl', ['$scope', function($scope) {

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

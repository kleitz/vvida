angular.module('vvida.controllers')
  .controller('ItemsCtrl', ['$timeout', '$scope', 'Categories', function($timeout, $scope, Categories) {
    $scope.user = null;
    $scope.users = null;

    $scope.loadCategories = function() {
      // Use timeout to simulate a 650ms request.
      return $timeout(function() {
        $scope.categories = Categories.query();
        $scope.categories = $scope.categories;
      }, 650);
    };

    $scope.saveImage = function(flow) {
      console.log(flow.files);
    };
  }]);

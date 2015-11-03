angular.module('vvida.controllers')
  .controller('ItemsCtrl', ['$timeout', '$scope', 'Categories', '$upload', 'Utils', function($timeout, $scope, Categories, $upload, Utils) {
    $scope.user = null;
    $scope.users = null;

    $scope.loadCategories = function() {
      // Use timeout to simulate a 650ms request.
      return $timeout(function() {
        $scope.categories = Categories.query();
        $scope.categories = $scope.categories;
      }, 650);
    };

    $scope.fileSelected = function(files) {
      $scope.files = files;
    };

    $scope.addItems = function() {
      var item = {
        id: $scope.item.catId,
        name: $scope.item.name,
        description: $scope.item.description,
      };

      $upload.upload({
        url: '/api/items/8',
        data: item,
        photos: $scope.files
      }).progress(function(evt) {
        $scope.loading = true;
      }).success(function(data) {
        $scope.loading = false;
        Utils.toast.success('Recipe successfully added and will be visible to others after approval');
      });
    };
  }]);

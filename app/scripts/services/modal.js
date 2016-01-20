angular.module('vvida.services')
  .service('ModalService', ['$mdDialog', function($mdDialog) {
    return function(ev, title, content) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'views/modal.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: true
      });

      function DialogController($scope, $mdDialog) {

        $scope.modalContent = title;
        $scope.modalTitle = content;

        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
      }
    };
  }]);

angular.module('vvida.services', []).service('Utils', function($mdToast, $mdDialog) {
  this.toast = function(msg) {
    $mdToast.show($mdToast.simple().content(msg));
    // Could also do $mdToast.showSimple('Hello');
  };
  this.dialog = function(title, message, event, callback) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
        $mdDialog.confirm()
        .parent(angular.element(document.body))
        .clickOutsideToClose(true)
        .title(title)
        .content(message)
        .ariaLabel('Utils Dialog Service')
        .ok('OK')
        .cancel('CANCEL')
        .targetEvent(event)
      )
      .then(function() {
        callback();
      }, function() {});
  };
});

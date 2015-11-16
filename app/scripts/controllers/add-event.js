(function() {
  'use strict';
  angular.module('vvida.controllers')
    .controller('AddEventCtrl', ['$timeout', '$scope', '$state', 'Events', 'Utils',
      function($timeout, $scope, $state, Events, Utils) {
        $scope.addEvent = function() {
          Events.save($scope.event, function(event) {
            if (event) {
              $state.go('editEvent', {
                id: event.id
              });
            } else {
              Utils.toast('Event not created');
            }
          });
        };
      }
    ]);
})();

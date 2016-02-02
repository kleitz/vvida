angular.module('vvida.controllers')
  .controller('WelcomeCtrl', ['$scope', '$rootScope', 'Events', 'Items',
    function($scope, $rootScope, Events, Items) {
      $scope.init = function() {
        $scope.todos = [];
        $scope.events = Events.query();
        $scope.items = Items.query();
        $scope.item = {
          face: 'http://lorempixel.com/50/50/people?' + 9,
          who
          : ' write something about this company, and live the life you want',
          what: 'And experince the magic of you opinion',
          notes: 'Hey there ! , have you made any review yet?' +
            ' your next review awaits, '
        };
        for (var i = 0; i < 3; i++) {
          $scope.todos.push({
            face: 'http://lorempixel.com/100/100/people?' + i,
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            notes: 'I\'ll be in your neighborhood doing errands.'
          });
        }
      };
      $scope.init();
    }
  ]);

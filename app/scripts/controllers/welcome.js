angular.module('vvida.controllers')
  .controller('WelcomeCtrl', ['$scope', function($scope) {
    $scope.todos = [];
    $scope.title = 'My App Title';
    for (var i = 0; i < 15; i++) {
      $scope.todos.push({
        face: 'http://lorempixel.com/50/50/people?' + i,
        what: "Brunch this weekend?",
        who: "Min Li Chan",
        notes: "I'll be in your neighborhood doing errands."
      });
    }
  }]);

angular.module('vvida.controllers')
  .controller('WelcomeCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.todos = [];
    $scope.item = {
      face: 'http://lorempixel.com/50/50/people?' + 9,
      who: " write something about this company, and live the life you want",
      what: "And experince the magic of you opinion",
      notes: "Hey " + $rootScope.currentUser.firstname + " , have you made any review yet? your next review awaits, "
    };
    for (var i = 0; i < 3; i++) {
      $scope.todos.push({
        face: 'http://lorempixel.com/100/100/people?' + i,
        what: "Brunch this weekend?",
        who: "Min Li Chan",
        notes: "I'll be in your neighborhood doing errands."
      });
    }

    $scope.items = [];
    for (i = 0; i < 9; i++) {
      $scope.items.push({
        face: 'http://lorempixel.com/300/200/nightlife?' + i,
        title: "Brunch this weekend?",
      });
    }

  }]);

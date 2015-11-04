angular.module('vvida.controllers')
  .controller('WelcomeCtrl', ['$scope', function($scope) {
    'use strict';
    var imagePath = 'images/event-photo1.jpg';
    $scope.messages = [{
      face: imagePath,
      what: 'Hilton Hotel',
      who: 'Thomas Nyambati',
      notes: 'This place gets crowded and parking is a tad difficult, but you seriously have to come here to try their tropical flavors (ube & macapuno)'
    }, {
      face: imagePath,
      what: 'Maasai Mara',
      who: 'Teddy Otieno Asola',
      notes: 'This has to be the best place I have ever been. The ambience is excuisite and very welocoming. I love the games and activities that have been scheduled for visitors.'
    }];

    $scope.reviewOfTheDay = {
      face: imagePath,
      what: 'Cold Stone Creamery',
      who: 'Eugene Mutai',
      notes: 'If you\'re a casual drinker, or one who never drink different types of alcohols, or one who knows little about mixologycraft cocktails, then Cold Stone Creamery is the type of place to start. This was one of the OG'
    };
  }]);

angular.module('vvida.controllers')
  .controller('WelcomeCtrl', ['$scope', 'Users', function($scope, Users) {
    var imagePath = 'images/event-photo1.jpg';
    $scope.messages = [{
      face: imagePath,
      what: 'Hilton Hotel',
      who: 'Thomas Nyambati',
      notes: 'This place gets crowded and parking is a tad difficult, but you seriously have to come here to try their tropical flavors (ube & macapuno), its deliciously creamy! Looks like they have a solid grip on their traditional flavors too. I cant wait to come and try it out.'
    }, {
      face: imagePath,
      what: 'Maasai Mara',
      who: 'Teddy Otieno Asola',
      notes: 'This has to be the best place I have ever been. The ambience is excuisite and very welocoming. I love the games and activities that have been scheduled for visitors. Don\'t even get me started with the food. Well prepared and delicious. The effort that goes into preparing this dishes is clearly felt once you have just a taste of it. This is one place I would recommend anyone to come and visit. This is a challenge to fellow Kenyans who to my opinion I feel haven\'t really explored the tourism potential of their country. Thank You so much.'
    }];

    $scope.reviewOfTheDay = {
      face: imagePath,
      what: 'Cold Stone Creamery',
      who: 'Eugene Mutai',
      notes: 'If you\'re a casual drinker, or one who never drink different types of alcohols, or one who knows little about mixology/craft cocktails, then Cold Stone Creamery is the type of place to start. This was one of the OG'
    };
  }]);

angular.module('vvida.controllers')
  .controller('AboutCtrl', ['$scope', 'Utils', function($scope, Utils) {
    $scope.developers = [{
      name: 'Godson Ukpere',
      title: 'Chief Technical Officer',
      img_url: 'https://avatars1.githubusercontent.com/u/2857896?v=3&s=192'
    }, {
      name: 'Nyambati N Thomas',
      title: 'Junior Consultant',
      img_url: 'https://avatars3.githubusercontent.com/u/12892110?v=3&s=460'
    }, {
      name: 'Eugene Mutai',
      title: 'Junior Consultant',
      img_url: 'https://avatars2.githubusercontent.com/u/1999708?v=3&s=460'
    }, {
      name: 'Hannah Koske',
      title: 'Junior Consultant',
      img_url: 'https://avatars3.githubusercontent.com/u/13534520?v=3&s=192'
    }, {
      name: 'Teddy Otieno Asola',
      title: 'Junior Consultant',
      img_url: 'https://avatars3.githubusercontent.com/u/12892106?v=3&s=460'
    }, {
      name: 'Nate Martins Mwangi',
      title: 'Junior Consultant',
      img_url: 'https://avatars1.githubusercontent.com/u/12892047?v=3&s=460'
    }];
  }]);

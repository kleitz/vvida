angular.module('vvida.controllers')
  .controller('AboutCtrl', ['$scope', function($scope) {
    $scope.developers = [{
      name: 'Godson Ukpere',
      title: 'Chief Technical Officer',
      img_url: 'https://avatars1.githubusercontent.com/u/2857896?v=3&s=192'
    }, {
      name: 'Nyambati N Thomas',
      title: 'Back-End/API Engineer',
      img_url: 'https://avatars3.githubusercontent.com/u/12892110?v=3&s=460'
    }, {
      name: 'Eugene Mutai',
      title: 'Staff Developer Advocate',
      img_url: 'https://avatars2.githubusercontent.com/u/1999708?v=3&s=460'
    }, {
      name: 'Hannah Koske',
      title: 'Front-End Engineer',
      img_url: 'https://avatars3.githubusercontent.com/u/13534520?v=3&s=192'
    }, {
      name: 'Teddy Otieno Asola',
      title: 'UI/UX Designer',
      img_url: 'https://avatars3.githubusercontent.com/u/12892106?v=3&s=460'
    }, {
      name: 'Nate Martins Mwangi',
      title: 'Dev Ops',
      img_url: 'https://avatars1.githubusercontent.com/u/12892047?v=3&s=460'
    }, {
      name: 'Owoade Dotun',
      title: 'Dev Ops',
      img_url: 'https://avatars0.githubusercontent.com/u/16131424?v=3&s=400'
    }, {
      name: 'Maryam Babalola',
      title: 'Back-End Engineer',
      img_url: 'https://avatars2.githubusercontent.com/u/15085733?v=3&s=400'
    }, {
      name: 'Lawrence Olaiya',
      title: 'UI/UX Designer',
      img_url: 'https://avatars1.githubusercontent.com/u/15085695?v=3&s=400'
    }, {
      name: 'Emmanuel Akinyele',
      title: 'Front-End Engineer',
      img_url: 'https://avatars0.githubusercontent.com/u/15085757?v=3&s=400'
    }, {
      name: 'Rowland Ekemezie',
      title: 'Staff Developer Advocate',
      img_url: 'https://avatars1.githubusercontent.com/u/15085641?v=3&s=400'
    }];

    $scope.about = {
      img_url: '',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod' +
        'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,' +
        'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo' +
        'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse' +
        'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' +
        'proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    };

  }]);

angular.module('vvida.services')
  .factory('ReviewSearch', ['$http', function($resource) {
    var obj = $resource;
    return obj;

  }]);

angular.module('vvida.services')
  .factory('Messages', ['$resource', function($resource) {
    var obj = $resource('/api/messages/:id', {
      id: '@id'
    }, {
      update: {
        // this method issues a PUT request
        method: 'PUT'
      }
    }, {
      stripTrailingSlashes: false
    });
  }]);

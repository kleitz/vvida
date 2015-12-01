angular.module('vvida.services')
  .factory('Items', ['$resource', '$http', function($resource) {
    return $resource('/api/items/:id', {
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

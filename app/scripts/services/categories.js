angular.module('vvida.services')
  .factory('Categories', ['$resource', '$http', function($resource) {
    return $resource('/api/categories/:id', {
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

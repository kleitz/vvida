angular.module('vvida.services')
  .factory('Categories', ['$resource', function($resource) {
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

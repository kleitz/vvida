angular.module('vvida.services')
  .factory('Events', ['$resource', '$http', function($resource) {
    return $resource('/api/events/:id', {
      id: '@id',
      limit: '@limit',
      page: '@page'
    }, {
      update: {
        // this method issues a PUT request
        method: 'PUT'
      }
    }, {
      stripTrailingSlashes: false
    });
  }]);

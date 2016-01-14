angular.module('vvida.services')
  .factory('Reviews', ['$resource', '$http', function($resource) {
    return $resource('/api/reviews/:id', {
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

angular.module('vvida.services')
  .factory('Reservations', ['$resource', function($resource) {
    return $resource('/api/reserveations/:id', {
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

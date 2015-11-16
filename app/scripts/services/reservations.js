angular.module('vvida.services')
  .factory('Reservations', ['$resource', function($resource) {
    var obj = $resource('/api/reserveations/:id', {
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

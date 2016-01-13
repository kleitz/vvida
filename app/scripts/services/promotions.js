angular.module('vvida.services')
  .factory('Promotions', ['$resource', function($resource) {
    return $resource('/api/promotions/:id', {
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

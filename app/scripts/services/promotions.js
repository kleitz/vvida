angular.module('vvida.services')
  .factory('Promotions', ['$resource', function($resource) {
    var obj = $resource('/api/promotions/:id', {
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

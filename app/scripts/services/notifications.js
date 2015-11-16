angular.module('vvida.services')
  .factory('Notifications', ['$resource', function($resource) {
    var obj = $resource('/api/notifications/:id', {
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

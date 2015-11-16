angular.module('vvida.services')
  .factory('Notifications', ['$resource', function($resource) {
    return $resource('/api/notifications/:id', {
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

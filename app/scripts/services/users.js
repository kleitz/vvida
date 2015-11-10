angular.module('vvida.services')
  .factory('Users', ['$resource', '$http', function($resource, $http) {
    var obj = $resource('/api/users/:id', {
      id: '@id'
    }, {
      update: {
        // this method issues a PUT request
        method: 'PUT'
      }
    }, {
      stripTrailingSlashes: false
    });

    obj.login = function(user, cb) {
      $http.post('/api/users/login', user).success(function(res) {
        cb(null, res);
      }).error(function(err) {
        cb(err);
      });
    };

    obj.session = function(cb) {
      $http.get('/api/users/session').success(function(res) {
        cb(null, res);
      }).error(function(err) {
        cb(err);
      });
    };

    obj.logout = function(user, cb) {
      $http.get('/api/users/logout', user).success(function(res) {
        cb(null, res);
      }).error(function(err) {
        cb(err);
      });
    };

    obj.items = function(user, cb) {
      $http.get('/api/users/' + '2' + '/items').success(function(res) {
        cb(null, res);
      }).error(function(err) {
        cb(err);
      });
    };

    obj.reviews = function(user, cb) {
      $http.get('/api/users/' + '2' + '/reviews').success(function(res) {
        cb(null, res);
      }).error(function(err) {
        cb(err);
      });
    };

     obj.events = function(user, cb) {
      $http.get('/api/users/' + '1' + '/events').success(function(res) {
        cb(null, res);
      }).error(function(err) {
        cb(err);
      });
    };

    return obj;
  }]);

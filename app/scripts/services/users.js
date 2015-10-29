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

    obj.signup = function(user, cb) {
      $http.post('/api/users', user).success(function(res) {
        cb(null, res);
      }).catch(function(err) {
        cb(err);
      });
    };

    obj.update = function(user, cb) {
      $http.put('/api/users/'+user.id, user).success(function(res) {
        cb(null, res);
      }).catch(function(err) {
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

    return obj;
  }]);

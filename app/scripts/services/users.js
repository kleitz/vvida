angular.module('vvida.services')
<<<<<<< HEAD

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

    obj.signup = function(user, cb) {
      $http.post('/api/users/signup', user).success(function(res) {
        cb(null, res);
      }).error(function(err) {
        cb(err);
      });
    };

    return obj;
  }]);
=======
.factory('Users',function($resource) {
  return $resource('/api/users/:id');
});
>>>>>>> 452c1b0981b57795d6fd2ba668917b803cd927d7

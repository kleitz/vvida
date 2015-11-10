angular.module('vvida.services')
  .factory('Users', ['$resource', '$http', '$rootScope', function($resource, $http, $rootScope) {
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

    obj.items = function(cb) {
      if ($rootScope.currentUser) {
        $http.get('/api/users/' + $rootScope.currentUser.id + '/items').success(function(res) {
          cb(null, res);
        }).error(function(err) {
          cb(err);
        });
      }
    };

    obj.itemsCount = function(cb) {
      if ($rootScope.currentUser) {
        $http.get('/api/users/' + $rootScope.currentUser.id + '/items/no').success(function(res) {
          cb(null, res);
        }).error(function(err) {
          cb(err);
        });
      }
    };

    obj.reviews = function(cb) {
      if ($rootScope.currentUser) {
        $http.get('/api/users/' + $rootScope.currentUser.id + '/reviews').success(function(res) {
          cb(null, res);
        }).error(function(err) {
          cb(err);
        });
      }
    };

    obj.reviewsCount = function(cb) {
      if ($rootScope.currentUser) {
        $http.get('/api/users/' + $rootScope.currentUser.id + '/reviews/no').success(function(res) {
          cb(null, res);
        }).error(function(err) {
          cb(err);
        });
      }
    };

    obj.events = function(cb) {
      if ($rootScope.currentUser) {
        $http.get('/api/users/' + $rootScope.currentUser.id + '/events').success(function(res) {
          cb(null, res);
        }).error(function(err) {
          cb(err);
        });
      }
    };

    obj.eventsCount = function(cb) {
      if ($rootScope.currentUser) {
        $http.get('/api/users/' + $rootScope.currentUser.id + '/events/no').success(function(res) {
          cb(null, res);
        }).error(function(err) {
          cb(err);
        });
      }
    };

    return obj;
  }]);

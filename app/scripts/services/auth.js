angular.module('vvida.services')
  .factory('Auth', ['Token', function(Token) {
    return {
      isLoggedIn: function() {
        if (Token.get()) {
          return true;
        } else {
          return false;
        }
      },
      setToken: function(token) {
        Token.set(token);
      },
      logout: function() {
        Token.remove();
      }
    };
  }])
  .factory('TokenInjector', ['Token', function(Token) {
    var tokenInjector = {
      request: function(config) {
        var token = Token.get();
        if (token) {
          config.headers['x-access-token'] = token;
          console.log('Config headers: ', config.headers);
        }
        return config;
      }
    };
    return tokenInjector;
  }])
  .factory('Token', ['$window', function($window) {
    return {
      set: function(token) {
        $window.localStorage.setItem('token', token);
      },

      get: function() {
        return $window.localStorage.getItem('token');
      },

      remove: function() {
        $window.localStorage.removeItem('token');
      }
    };
  }]);

angular.module('vvida.services')
  .factory('Auth', ['Token', 'UserInfo', function(Token, UserInfo) {
    return {
      isLoggedIn: function() {
        if (Token.get() && UserInfo.get()) {
          return true;
        } else {
          return false;
        }
      },
      setToken: function(token, user) {
        Token.set(token);
        UserInfo.set(user);
      },
      getUser: function() {
        return UserInfo.get();
      },
      logout: function() {
        Token.remove();
        UserInfo.remove();
      }
    };
  }])
  .factory('TokenInjector', ['Token', function(Token) {
    var tokenInjector = {
      request: function(config) {
        var token = Token.get();
        if (token) {
          config.headers['x-access-token'] = token;
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
  }])
  .factory('UserInfo', ['$window', function($window) {
    return {
      set: function(token) {
        $window.localStorage.setItem('user', token);
      },

      get: function() {
        return $window.localStorage.getItem('user');
      },

      remove: function() {
        $window.localStorage.removeItem('user');
      }
    };
  }]);

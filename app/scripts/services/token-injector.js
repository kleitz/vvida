angular.module('vvida.services')
  .factory('TokenInjector', ['Token', function(Token) {
    var tokenInjector = {
      request: function(config) {
        var token = Token.get();
        if (token) {
          config.headers['x-access-token'] = token;
        }
        config.headers['Access-Control-Allow-Origin'] = '*';
        return config;
      }
    };
    return tokenInjector;
  }]);

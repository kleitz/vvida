describe('Token Service Test', function() {

  beforeEach(function() {
    module('vvida');
  });

  var TokenInjector, Token;
  beforeEach(inject(function($injector) {
    TokenInjector = $injector.get('TokenInjector');
    Token = $injector.get('Token');
  }));

  describe('TokenInjector unit tests', function() {
    it('request should be a function', function() {
      expect(TokenInjector.request).toBeDefined();
      expect(typeof TokenInjector.request).toBe('function');
    });

    it('request should call Token.get', function() {
      Token.get = sinon.stub().returns('vvida');
      expect(TokenInjector.request({
        headers: {
          'x-access-token': 'token'
        }
      }).headers['x-access-token']).toBe('vvida');
      expect(Token.get.called).toBe(true);
    });

  });
});

describe('Auth Service Test', function() {

  beforeEach(function() {
    module('vvida');
  });

  var Auth,
    Token;
  beforeEach(inject(function($injector) {
    Auth = $injector.get('Auth');
    Token = $injector.get('Token');
  }));

  describe('Auth unit tests', function() {
    it('isLoggedIn should be a function', function() {
      expect(Auth.isLoggedIn).toBeDefined();
      expect(typeof Auth.isLoggedIn).toBe('function');
    });

    it('setToken should be a function', function() {
      expect(Auth.setToken).toBeDefined();
      expect(typeof Auth.setToken).toBe('function');
    });

    it('logout should be a function and be defined', function() {
      expect(Auth.logout).toBeDefined();
      expect(typeof Auth.logout).toBe('function');
    });
  });
});

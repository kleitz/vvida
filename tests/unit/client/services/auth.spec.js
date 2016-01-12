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

    it('isLoggedIn should call Token.get and return true', function() {
      Token.get = sinon.stub().returns(true);
      expect(Auth.isLoggedIn()).toBe(true);
      expect(Token.get.called).toBe(true);
    });

    it('isLoggedIn should return false if Token.get returns false', function() {
      Token.get = sinon.stub().returns(false);
      expect(Auth.isLoggedIn()).toBe(false);
      expect(Token.get.called).toBe(true);
    });

    it('setToken should be a function', function() {
      expect(Auth.setToken).toBeDefined();
      expect(typeof Auth.setToken).toBe('function');
    });

    it('setToken should call Token.set', function() {
      Token.set = sinon.spy();
      Auth.setToken('vvida');
      expect(Token.set.called).toBe(true);
    });

    it('logout should be a function and be defined', function() {
      expect(Auth.logout).toBeDefined();
      expect(typeof Auth.logout).toBe('function');
    });

    it('logout should call Token.remove', function() {
      Token.remove = sinon.spy();
      Auth.logout();
      expect(Token.remove.called).toBe(true);
    });
  });
});

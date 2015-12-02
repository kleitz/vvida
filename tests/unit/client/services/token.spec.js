describe('Token Service Test', function() {

  beforeEach(function() {
    module('vvida');
  });

  var Token,
    $window;
  beforeEach(inject(function($injector) {
    Token = $injector.get('Token');
    $window = $injector.get('$window');
  }));

  describe('Token unit tests', function() {
    it('set should be a function', function() {
      expect(Token.set).toBeDefined();
      expect(typeof Token.set).toBe('function');
    });

    it('get should be a function', function() {
      expect(Token.get).toBeDefined();
      expect(typeof Token.get).toBe('function');
    });

    it('remove should be a function and be defined', function() {
      expect(Token.remove).toBeDefined();
      expect(typeof Token.remove).toBe('function');
    });
  });
});

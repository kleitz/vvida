describe('Token Service Test', function() {
  'use strict';
  beforeEach(function() {
    module('vvida');
  });

  var Token,
    $window, localStorage;
  beforeEach(inject(function($injector) {
    Token = $injector.get('Token');
    $window = $injector.get('$window');
    localStorage = $window.localStorage;
  }));

  describe('Token unit tests', function() {
    it('set should be a function', function() {
      expect(Token.set).toBeDefined();
      expect(typeof Token.set).toBe('function');
    });

    it('set should call $window.localStorage.setItem', function() {
      localStorage.setItem = sinon.stub();
      Token.set('vvida');
      expect(localStorage.setItem.called).toBe(true);
    });

    it('get should be a function', function() {
      expect(Token.get).toBeDefined();
      expect(typeof Token.get).toBe('function');
    });

    it('get should call $window.localStorage.getItem', function() {
      localStorage.getItem = sinon.stub().returns(true);
      expect(Token.get()).toBe(true);
      expect(localStorage.getItem.called).toBe(true);
    });

    it('remove should be a function and be defined', function() {
      expect(Token.remove).toBeDefined();
      expect(typeof Token.remove).toBe('function');
    });

    it('remove should call $window.localStorage.removeItem', function() {
      localStorage.removeItem = sinon.stub();
      Token.remove();
      expect(localStorage.removeItem.called).toBe(true);
    });
  });
});

describe('Utils Service Test', function() {

  beforeEach(function() {
    module('vvida');
  });

  var Utils;
  beforeEach(inject(function($injector) {
    Utils = $injector.get('Utils');
  }));

  describe('Utils unit tests', function() {
    it('toast should be a function', function() {
      expect(Utils.toast).toBeDefined();
      expect(typeof Utils.toast).toBe('function');
    });

    it('dialog should be a function', function() {
      expect(Utils.dialog).toBeDefined();
      expect(typeof Utils.dialog).toBe('function');
    });
  });
});

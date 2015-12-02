describe('Messages Service Test', function() {

  beforeEach(function() {
    module('vvida');
  });

  var Messages,
  $resource;
  beforeEach(inject(function($injector) {
    Messages = $injector.get('Messages');
    $resource = $injector.get('$resource');
    spyOn(Messages, "update").and.returnValue();
    Messages.update();
  }));

  describe('Messages unit tests', function() {
    it('update should be a function', function() {
      expect(Messages.update).toBeDefined();
      expect(Messages.update).toHaveBeenCalled();
      expect(typeof Messages.update).toBe('function');
    });
  });
});

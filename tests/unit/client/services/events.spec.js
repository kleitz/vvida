describe('Events Service Test', function() {

  beforeEach(function() {
    module('vvida');
  });

  var Events,
  $http,
  $resource;
  beforeEach(inject(function($injector) {
    Events = $injector.get('Events');
    $resource = $injector.get('$resource');
    $http = $injector.get('$http');
    spyOn(Events, "update").and.returnValue();
    Events.update();
  }));

  describe('Events unit tests', function() {
    it('update should be a function', function() {
      expect(Events.update).toBeDefined();
      expect(Events.update).toHaveBeenCalled();
      expect(typeof Events.update).toBe('function');
    });
  });
});

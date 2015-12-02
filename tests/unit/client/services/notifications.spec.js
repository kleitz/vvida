describe('Notifications Service Test', function() {

  beforeEach(function() {
    module('vvida');
  });

  var Notifications,
  $resource;
  beforeEach(inject(function($injector) {
    Notifications = $injector.get('Notifications');
    $resource = $injector.get('$resource');
    spyOn(Notifications, "update").and.returnValue();
    Notifications.update();
  }));

  describe('Notifications unit tests', function() {
    it('update should be a function', function() {
      expect(Notifications.update).toBeDefined();
      expect(Notifications.update).toHaveBeenCalled();
      expect(typeof Notifications.update).toBe('function');
    });
  });
});

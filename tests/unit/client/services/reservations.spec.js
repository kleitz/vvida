describe('Reservations Service Test', function() {

  beforeEach(function() {
    module('vvida');
  });

  var Reservations,
  $http,
  $resource;
  beforeEach(inject(function($injector) {
    Reservations = $injector.get('Reservations');
    $resource = $injector.get('$resource');
    $http = $injector.get('$http');
    spyOn(Reservations, "update").and.returnValue();
    Reservations.update();
  }));

  describe('Reservations unit tests', function() {
    it('update should be a function', function() {
      expect(Reservations.update).toBeDefined();
      expect(Reservations.update).toHaveBeenCalled();
      expect(typeof Reservations.update).toBe('function');
    });
  });
});

describe('Countries Service Test', function() {

  beforeEach(function() {
    module('vvida');
  });

  var Countries,
  $http;
  beforeEach(inject(function($injector) {
    Countries = $injector.get('Countries');
    $http = $injector.get('$http');
    spyOn(Countries, "getCountries").and.returnValue();
    Countries.getCountries();
  }));

  describe('Countries unit tests', function() {
    it('getCountries should be a function', function() {
      expect(Countries.getCountries).toBeDefined();
      expect(Countries.getCountries).toHaveBeenCalled();
      expect(typeof Countries.getCountries).toBe('function');
    });
  });
});

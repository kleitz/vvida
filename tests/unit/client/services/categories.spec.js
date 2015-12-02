describe('Categories Service Test', function() {

  beforeEach(function() {
    module('vvida');
  });

  var Categories,
  $resource,
  $http;
  beforeEach(inject(function($injector) {
    Categories = $injector.get('Categories');
    $resource = $injector.get('$resource');
    $http = $injector.get('$http');
    spyOn(Categories, "update").and.returnValue(745);
    Categories.update();
  }));

  describe('Categories unit tests', function() {
    it('update should be a function', function() {
      expect(Categories.update).toBeDefined();
      expect(Categories.update).toHaveBeenCalled();
      expect(typeof Categories.update).toBe('function');
    });
  });
});

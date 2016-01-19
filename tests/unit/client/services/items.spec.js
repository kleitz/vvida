describe('Items Service Test', function() {
'use strict';
  beforeEach(function() {
    module('vvida');
  });

  var Items,
  $http,
  $resource;
  beforeEach(inject(function($injector) {
    Items = $injector.get('Items');
    $resource = $injector.get('$resource');
    $http = $injector.get('$http');
    spyOn(Items, 'update').and.returnValue();
    Items.update();
  }));

  describe('Items unit tests', function() {
    it('update should be a function', function() {
      expect(Items.update).toBeDefined();
      expect(Items.update).toHaveBeenCalled();
      expect(typeof Items.update).toBe('function');
    });
  });
});

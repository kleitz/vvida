describe('Promotions Service Test', function() {
  'use strict';
  beforeEach(function() {
    module('vvida');
  });

  var Promotions,
    $resource;
  beforeEach(inject(function($injector) {
    Promotions = $injector.get('Promotions');
    $resource = $injector.get('$resource');
    spyOn(Promotions, 'update').and.returnValue();
    Promotions.update();
  }));

  describe('Promotions unit tests', function() {
    it('update should be a function', function() {
      expect(Promotions.update).toBeDefined();
      expect(Promotions.update).toHaveBeenCalled();
      expect(typeof Promotions.update).toBe('function');
    });
  });
});

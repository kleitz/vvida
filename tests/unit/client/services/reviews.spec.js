describe('Reviews Service Test', function() {
  'use strict';
  beforeEach(function() {
    module('vvida');
  });

  var Reviews,
    $http,
    $resource;
  beforeEach(inject(function($injector) {
    Reviews = $injector.get('Reviews');
    $resource = $injector.get('$resource');
    $http = $injector.get('$http');
    spyOn(Reviews, 'update').and.returnValue();
    Reviews.update();
  }));

  describe('Reviews unit tests', function() {
    it('update should be a function', function() {
      expect(Reviews.update).toBeDefined();
      expect(Reviews.update).toHaveBeenCalled();
      expect(typeof Reviews.update).toBe('function');
    });
  });
});

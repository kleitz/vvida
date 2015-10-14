describe('HomeCtrl tests', function() {
  var scope,
    controller;
  beforeEach(function() {
    module('vvida');
  });

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    scope = $injector.get('$rootScope');
    controller = $controller('HomeCtrl', {
      $scope: scope
    });
  }));

  it('should define header_image', function() {
    expect(scope.header_image).toBeDefined();
    expect(typeof scope.header_image).toBe('string');
  });

});

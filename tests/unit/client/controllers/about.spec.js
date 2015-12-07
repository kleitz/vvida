describe('AboutCtrl tests', function() {
  var scope,
    controller;
  beforeEach(function() {
    module('vvida');
  });

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    scope = $injector.get('$rootScope');
    controller = $controller('AboutCtrl', {
      $scope: scope
    });
  }));

  it('should define developers array', function() {
    expect(scope.developers).toBeDefined();
    expect(typeof scope.developers).toBe('object');
    expect(scope.developers.length).toBe(6);
    expect(scope.developers instanceof Array).toBe(true);
  });

  it('should define about object', function() {
    expect(scope.about).toBeDefined();
    expect(typeof scope.about).toBe('object');
    expect(scope.developers.length).toBe(6);
  });

});

describe('Testing Vvida Controller', function() {
  var _scope, HomeController;

  beforeEach(function() {
    module('mean');

    inject(function($rootScope, $controller) {
      _scope = $rootScope.$new();
      HomeController = $controller('HomeCtrl', {
        $scope: _scope
      });
    });
  });

  it('Should be registered', function() {
    expect(HomeController).toBeDefined();
  });

  it('Should include CRUD methods', function() {
    expect(_scope.find).toBeDefined();
    expect(_scope.findOne).toBeDefined();
    expect(_scope.create).toBeDefined();
    expect(_scope.delete).toBeDefined();
    expect(_scope.update).toBeDefined();
  });
});
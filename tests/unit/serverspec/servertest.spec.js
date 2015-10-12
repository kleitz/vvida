describe('Testing Vvida Controller', function() {
  var _scope, HomeController;

  beforeEach(function() {
    module('home');

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
});
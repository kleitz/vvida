describe('Testing Vvida Home Controller', function() {
  // var _scope, HomeController;

  beforeEach(function() {
    mainModule = angular.module('vvida');

    // inject(function($rootScope, $controller) {
    //   _scope = $rootScope.$new();
    //   HomeController = $controller('HomeCtrl', {
    //     $scope: _scope
    //   });
    // });
  });

  it('should be registered', function() {
    expect(mainModule).toBeDefined();
  });
});
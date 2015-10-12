describe('Testing Vvida Home Controller', function() {
  // var _scope, HomeController;
  var mainModule;

  beforeEach(function() {
    mainModule = angular.module('../../../server/routes/users');

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
describe('WelcomeCtrl tests', function() {
  var scope,
    controller,
    Utils,
    Items,
    Events,
    Categories;
  beforeEach(function() {
    module('vvida');
  });

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    scope = $injector.get('$rootScope');
    controller = $controller('WelcomeCtrl', {
      $scope: scope

    });
    Items = $injector.get('Items');
    Events = $injector.get('Events');
    scope.init();
  }));



  it('should set some variables', function() {
    expect(scope.todos).toBeTruthy();
    expect(scope.events).toBeTruthy();
    expect(scope.items).toBeTruthy();
    expect(scope.item).toBeTruthy();
  });

});

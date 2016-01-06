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
  }));



  it('should set some variables', function() {
    spyOn(Items,'query');
    spyOn(Events,'query');
    expect(scope.todos).toBeTruthy();
    expect(scope.events).toBeTruthy();
    expect(scope.items).toBeTruthy();
    expect(scope.item).toBeTruthy();
    expect(Items.query).toHaveBeenCalled();
    expect(Events.query).toHaveBeenCalled();
  });

});

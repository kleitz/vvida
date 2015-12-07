describe('ItemCtrl tests', function() {
  var scope,
    controller, Utils, Items;
  beforeEach(function() {
    module('vvida');
  });

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    scope = $injector.get('$rootScope');
    controller = $controller('ItemCtrl', {
      $scope: scope
    });
    Utils = $injector.get('Utils');
    Items = $injector.get('Items');
    spyOn(scope, 'loadCategories').and.callThrough();
    spyOn(scope, 'addItems').and.callThrough();
    spyOn(scope, 'updateItem').and.callThrough();
    spyOn(scope, 'showToast').and.callThrough();
    spyOn(scope, 'upload').and.callThrough();
    scope.loadCategories();
    scope.addItems();
    scope.updateItem();
    scope.showToast();
    scope.upload();
  }));

  it('should define and call scope.loadCategories', function() {
    expect(scope.loadCategories).toBeDefined();
    expect(scope.loadCategories).toHaveBeenCalled();
  });

  it('should define and call scope.addItems', function() {
    expect(scope.addItems).toBeDefined();
    expect(scope.addItems).toHaveBeenCalled();
  });

  it('should define and call scope.updateItem', function() {
    expect(scope.updateItem).toBeDefined();
    expect(scope.updateItem).toHaveBeenCalled();
  });

  it('should define and call scope.upload', function() {
    expect(scope.upload).toBeDefined();
    expect(scope.upload).toHaveBeenCalled();
  });

  it('should define and call scope.showToast', function() {
    expect(scope.showToast).toBeDefined();
    expect(scope.showToast).toHaveBeenCalled();
  });

});

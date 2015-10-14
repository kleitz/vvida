describe('AboutCtrl tests', function() {
  var scope,
    Utils,
    controller;
  beforeEach(function() {
    module('vvida');
  });

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    scope = $injector.get('$rootScope');
    Utils = $injector.get('Utils');
    controller = $controller('AboutCtrl', {
      $scope: scope,
      Utils: Utils
    });
  }));

  it('should call the openToast function in the Utils service', function() {
    spyOn(Utils, 'toast');
    scope.openToast();
    expect(Utils.toast).toHaveBeenCalled();
  });

  it('should call the openDialog function in the Utils service', function() {
    spyOn(Utils, 'dialog');
    scope.openDialog();
    expect(Utils.dialog).toHaveBeenCalled();
  });

});

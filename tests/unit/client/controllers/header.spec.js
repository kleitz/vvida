describe('HeaderCtrl tests', function() {
  var scope,
    controller, Users, Auth;
  beforeEach(function() {
    module('vvida');
  });

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    scope = $injector.get('$rootScope');
    controller = $controller('HeaderCtrl', {
      $scope: scope
    });
    Users = $injector.get('Users');
    Auth = $injector.get('Auth');
    spyOn(scope, 'logout').andCallThrough();
    spyOn(Users, 'logout').andCallThrough();
    scope.logout();
  }));

  it('should define and call scope.logout', function() {
    expect(scope.logout).toBeDefined();
    expect(scope.logout).toHaveBeenCalled();
  });

  it('should define and call Users.logout', function() {
    expect(Users.logout).toBeDefined();
    expect(Users.logout).toHaveBeenCalled();
  });

});

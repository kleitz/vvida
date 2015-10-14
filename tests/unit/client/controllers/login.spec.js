describe('LoginCtrl tests', function() {
  var scope,
    Users,
    controller;
  beforeEach(function() {
    module('vvida');
  });

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    scope = $injector.get('$rootScope');
    Users = $injector.get('Users');
    controller = $controller('LoginCtrl', {
      $scope: scope,
      Users: Users
    });
  }));

  it('should call the login function in the Users service', function() {
    spyOn(Users, 'login');
    scope.login();
    expect(Users.login).toHaveBeenCalled();
  });
});

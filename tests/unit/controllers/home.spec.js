describe('vvida module', function() {

  var mainModule;

  beforeEach(function() {
    mainModule = angular.module('vvida.controllers',
      ['ngRoute']).controller('HomeCtrl');
  });

  it('should be registered', function() {
    expect(mainModule).not.toEqual(null);
  });
  
});

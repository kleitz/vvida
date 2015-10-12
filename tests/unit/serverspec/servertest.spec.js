describe('App module', function() {
  // var _scope, HomeController;
  var mainModule;

  beforeEach(function() {
    mainModule = angular.module('App');
  });

  it('should be registered', function() {
    expect(mainModule).not.toEqual(null);
  });
  describe("Dependencies:", function() {

      var deps;
      var hasModule = function(m) {
        return deps.indexOf(m) >= 0;
      };
      before(function() {
        deps = module.value('App').requires;
      });

      //you can also test the module's dependencies
      it("should have App.Controllers as a dependency", function() {
        expect(hasModule('App.Controllers')).toEqual(true);
      });

      it("should have App.Directives as a dependency", function() {
        expect(hasModule('App.Directives')).toEqual(true);
      });

      it("should have App.Filters as a dependency", function() {
        expect(hasModule('App.Filters')).toEqual(true);
      });

      it("should have App.Routes as a dependency", function() {
        expect(hasModule('App.Routes')).toEqual(true);
      });

      it("should have App.Services as a dependency", function() {
        expect(hasModule('App.Services')).to.equal(true);
      });
    });
}); 
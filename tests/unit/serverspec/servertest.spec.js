describe('App module', function() {
  // var _scope, HomeController;
  var mainModule;

  beforeEach(function() {
    mainModule = angular.module('vvida');
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
        deps = module.value('vvida').requires;
      });

      //you can also test the module's dependencies
      it("should have App.Controllers as a dependency", function() {
        expect(hasModule('vvida.Controllers')).toEqual(true);
      });

      it("should have App.Directives as a dependency", function() {
        expect(hasModule('vvida.Directives')).toEqual(true);
      });

      it("should have App.Filters as a dependency", function() {
        expect(hasModule('vvida.Filters')).toEqual(true);
      });

      it("should have App.Routes as a dependency", function() {
        expect(hasModule('vvida.Routes')).toEqual(true);
      });

      it("should have App.Services as a dependency", function() {
        expect(hasModule('App.Services')).to.equal(true);
      });
    });
}); 
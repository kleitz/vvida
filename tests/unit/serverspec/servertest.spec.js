describe('vvida module', function() {

  var mainModule;

  beforeEach(function() {
    mainModule = angular.module('application');
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
      it("should have vvida.Controllers as a dependency", function() {
        expect(hasModule('vvida.Controllers')).toEqual(true);
      });

      it("should have vvida.Directives as a dependency", function() {
        expect(hasModule('vvida.Directives')).toEqual(true);
      });

      it("should have vvida.Filters as a dependency", function() {
        expect(hasModule('vvida.Filters')).toEqual(true);
      });

      it("should have vvida.Routes as a dependency", function() {
        expect(hasModule('vvida.Routes')).toEqual(true);
      });

      it("should have App.Services as a dependency", function() {
        expect(hasModule('App.Services')).to.equal(true);
      });
    });
}); 
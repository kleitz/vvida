describe('Countries Service Test', function() {
  'use strict';
  beforeEach(function() {
    module('vvida');
  });

  var Countries,
    $http, $httpBackend;

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', '/api/users/session')
      .respond(200, [{
        res: 'res'
      }]);
    $httpBackend.when('GET', 'views/home.html')
      .respond(200, [{
        res: 'res'
      }]);
    $http = $injector.get('$http');
    Countries = $injector.get('Countries');
  }));

  describe('Countries unit tests', function() {
    it('getCountries should be a function', function() {
      expect(Countries.all).toBeDefined();
      expect(typeof Countries.all).toBe('function');
    });

    it('all should call $http.get' +
      ' and $http.success on a 200 status',
      function() {
        var cb = sinon.spy();
        $httpBackend.when('GET', '/api/countries')
          .respond(200, [{
            res: 'res'
          }]);
        Countries.all(cb);
        $httpBackend.flush();
        expect(cb.called).toBe(true);
        expect(cb.args[0][1][0].res).toBe('res');
      });

    it('all should call $http.get' +
      ' and $http.error on a 500 status',
      function() {
        $httpBackend.when('GET', '/api/countries')
          .respond(500, [{
            err: 'err'
          }]);
        var error;
        var cb = function(err) {
          console.log(err);
          error = err;
        };
        cb = sinon.spy();
        Countries.all(cb);
        $httpBackend.flush();
        expect(cb.called).toBe(true);
        expect(cb.args[0][0][0].err).toBe('err');
      });
  });
});

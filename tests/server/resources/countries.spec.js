var request = require('superagent'),
  _expect = require('expect.js'),
  resourceApiUrl = 'http://localhost:3000/api/countries';

describe('Countries resource API tests', function() {

  /**
   * Display a listing of the resource.
   * GET /countries
   *
   * @return Response
   */
  it('should return countries or empty array if DB is empty', function(done) {
    request
      .get(resourceApiUrl)
      .accept('application/json')
      .end(function(err, res) {
        console.log(res.body);
        _expect(res.status).to.be(200);
        if (res.body.length === 0) {
          _expect(res.body).to.be.an('array');
        } else {
          var country = res.body;
          _expect(country.length).to.be.greaterThan(0);
          _expect(country[0].name).to.be.a('string');
        }
        done();
      });
  });
});

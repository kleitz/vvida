var request = require('superagent'),
  _expect = require('expect.js');

describe('Root route test', function() {

  /**
   * Display a listing of the resource.
   * GET / (root route)
   *
   * @return Response
   */
  it('should return index.html', function(done) {
    request
      .get('http://localhost:3000')
      .end(function(err, res) {
        _expect(res.status).to.be(200);
        _expect(res.header['content-type']).to.match(/(text\/html)/g);
        done();
      });
  });
});

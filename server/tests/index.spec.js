var request = require('superagent'),
  expect = require('expect.js');

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
      // .expect(200)
      // .expect('Content-Type', /html/)
      .end(function(err, res) {
        if (res.status == 200) {
          expect(res.header['content-type']).to.match(/(text\/html)/g);
          done();
        }
      });
  });
});

var request = require('superagent');

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
          expect(res.text).toMatch(/(html)/g);
          done();
        }
      });
  });
});

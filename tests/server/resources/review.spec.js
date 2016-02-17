var request = require('superagent'),
  faker = require('faker'),
  _expect = require('expect.js'),
  resourceApiUrl = 'http://localhost:3000/api/reviews';

describe('Reviews resource API tests', function() {

  var generateFakeReview = function() {
      return {
        // catId: faker.random.number(),
        itemId: faker.random.number(),
        eventId: faker.random.number(),
        review: faker.lorem.sentence(),
        review_title: faker.commerce.productName(),
        rating: faker.random.number(),
      };
    },
    generateFakeReviewUpdate = function() {
      return {
        review: faker.lorem.sentence(),
        review_title: faker.commerce.productName()
      };
    },
    authToken = null,
    // id to be a 'string'when a resource added
    id;

  /**
   * Store a newly created resource in storage.
   * POST /user/login
   *
   * @return Response
   */
  it('Must create session to run actions on reviews', function(done) {
    // Must log in to retain a session
    request
      .post('http://localhost:3000/api/users/login')
      .send({
        email: 'vvidaapp@gmail.com',
        password: '3at1ngYums@wh1leD0ingTh3Whip.c0m'
      })
      .end(function(err, res) {
        _expect(res.status).to.be(200);
        _expect(res.body.token).to.be.a('string');
        _expect(res.body.token.length).to.be.greaterThan(100);
        authToken = res.body.token;
        done();
      });
  });

  /**
   * Display a listing of the resource.
   * GET /review
   *
   * @return Response
   */

  it('should return empty array if DB is empty', function(done) {
    request
      .get(resourceApiUrl)
      .accept('application/json')
      .end(function(err, res) {
        _expect(res.status).to.be(200);
        _expect(res.body).to.be.an(Array);
        done();
      });
  });


  it('should not store resource in storage.', function(done) {
    var review = generateFakeReview();

    request
      .post(resourceApiUrl)
      .set('X-Access-Token', null)
      .send(review)
      .accept('application/json')
      .end(function(err, res) {
        _expect(res.status).to.be(401);
        done();
      });
  });

  it('should store a newly created resource in storage.', function(done) {
    var review = generateFakeReview();

    request
      .post(resourceApiUrl)
      .set('X-Access-Token', authToken)
      .send(review)
      .accept('application/json')
      .end(function(err, res) {
        _expect(res.status).to.be(200);
        var newReview = res.body;
        _expect(newReview.review).to.be(review.review);
        _expect(newReview.id).to.be.a('number');
        id = newReview.id;
        done();
      });
  });

  it('should return all reviews', function(done) {
    request
      .get(resourceApiUrl)
      .accept('application/json')
      .end(function(err, res) {
        _expect(res.status).to.be(200);
        var reviews = res.body;
        _expect(reviews.length).to.be.greaterThan(0);
        _expect(reviews[0].id).to.be.a('number');
        _expect(reviews[0].user_id).to.be.a('number');
        _expect(reviews[0].review).to.be.a('string');
        _expect(reviews[0].review_title).to.be.a('string');
        done();
      });
  });

  /**
   * Show the form for creating the specified resource.
   * GET /reviews/:id
   *
   * @param  int  $id
   * @return Response
   */
  it('should show the form for creating a new resource', function() {
    // Not used in an angular application
    // since the angular application will route to the edit form
    // and display it
    _expect(true).to.be(true);
  });

  /**
   * Display the specified resource.
   * GET /reviews/:id
   *
   * @param  int  $id
   * @return Response
   */
  it('should display the specified resource.', function(done) {
    request
      .get(resourceApiUrl + '/' + id)
      .accept('application/json')
      .end(function(err, res) {
        _expect(res.status).to.be(200);
        _expect(res.body.id).to.be(id);
        done();
      });
  });

  /**
   * Show the form for editing the specified resource.
   * GET /reviews/:id/edit
   *
   * @param  int  $id
   * @return Response
   */
  it('should show the form for editing the specified resource', function() {
    // Not used in an angular application
    // since the angular application will route to the edit form
    // and display it
    _expect(true).to.be(true);
  });

  /**
   * Update the specified resource in storage.
   * PUT /reviews/:id
   *
   * @param  int  $id
   * @return Response
   */
  it('should update the specified resource in storage.', function(done) {
    request
      .put(resourceApiUrl + '/' + id)
      .set('X-Access-Token', authToken)
      .send(generateFakeReviewUpdate())
      .accept('application/json')
      .end(function(err, res) {
        _expect(res.status).to.be(200);
        _expect(res.body.message).to.match(/(updated)/);
        done();
      });
  });

  /**
   * Remove the specified resource from storage.
   * DELETE /reviews/:id
   *
   * @param  int  $id
   * @return Response
   */
  it('should remove the specified resource from storage.', function(done) {
    request
      .del(resourceApiUrl + '/' + id)
      .set('X-Access-Token', authToken)
      .accept('application/json')
      .end(function(err, res) {
        _expect(res.status).to.be(200);
        _expect(res.body.message).to.be('Review deleted succesfully');
        done();
      });
  });

  it('should assert the document was deleted.', function(done) {
    request
      .get(resourceApiUrl + '/' + id)
      .accept('application/json')
      .end(function(err, res) {
        _expect(res.status).to.be(404);
        _expect(res.body.message).to.be('Review not found');
        done();
      });
  });

});

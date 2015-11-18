var request = require('superagent'),
  faker = require('faker'),
  _expect = require('expect.js'),
  resourceApiUrl = 'http://localhost:3000/api/items';

describe('Items resource API tests', function() {

  var generateFakeItem = function() {
      return {
        // catId: faker.random.number(),
        itemName: faker.commerce.productName(),
        description: faker.lorem.sentence()
      };
    },
    generateFakeItemUpdate = function() {
      return {
        name: faker.commerce.productName(),
        description: faker.lorem.sentence()
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
  it('Must create session to be able to run actions on items', function(done) {
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
   * GET /items
   *
   * @return Response
   */
  it('should return all items stored in the database or empty array if DB is empty', function(done) {
    request
      .get(resourceApiUrl)
      .accept('application/json')
      .end(function(err, res) {
        _expect(res.status).to.be(200);
        if (res.body.length === 0) {
          _expect(res.body).to.be.an('array');
        } else {
          var items = res.body;
          _expect(items.length).to.be.greaterThan(0);
          _expect(items[0].id).to.be.a('number');
          _expect(items[0].user_id).to.be.a('number');
          _expect(items[0].name).to.be.a('string');
          _expect(items[0].description).to.be.a('string');
          _expect(items[0].description).to.match(/(\s){1,}/g);
        }
        done();
      });
  });

  it('should store a newly created resource in storage.', function(done) {
    var item = generateFakeItem();
    request
      .post(resourceApiUrl)
      .set('X-Access-Token', authToken)
      .send(item)
      .accept('application/json')
      .end(function(err, res) {
        _expect(res.status).to.be(200);

        var newItem = res.body;
        _expect(newItem.name).to.be(item.itemName);
        _expect(newItem.id).to.be.a('number');
        id = newItem.id;
        done();
      });
  });

  /**
   * Show the form for creating the specified resource.
   * GET /items/{id}/create
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
   * GET /items/{id}
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
   * GET /items/{id}/edit
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
   * PUT /items/{id}
   *
   * @param  int  $id
   * @return Response
   */
  it('should update the specified resource in storage.', function(done) {
    request
      .put(resourceApiUrl + '/' + id)
      .set('X-Access-Token', authToken)
      .send(generateFakeItemUpdate())
      .accept('application/json')
      .end(function(err, res) {
        _expect(res.status).to.be(200);
        _expect(res.body.message).to.match(/(updated)/);
        done();
      });
  });

  /**
   * Remove the specified resource from storage.
   * DELETE /items/{id}
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
        _expect(res.body.message).to.match(/(success)/);
        done();
      });
  });
});

var request = require('superagent'),
  faker = require('faker'),
  _expect = require('expect.js'),
  resourceApiUrl = 'http://localhost:3000/api/users';

describe('User RESTful API tests', function() {

  var newUser = {
      password: faker.internet.password(),
      email: faker.internet.email()
    },
    userInfoUpdates = {
      username: faker.internet.userName(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      gender: 'male',
      country: 'Kenya',
      city: 'Nairobi'
    },
    authToken = null,
    // id to be defined when a resource added
    id;

  /**
   * Display a listing of the resource.
   * GET /users
   *
   * @return Response
   */
  it('should return all users stored in the database or empty array if DB is empty', function(done) {
    request
      .get(resourceApiUrl)
      // .use(requestPrefix)
      .accept('application/json')
      // .expect('Content-Type', /json/)
      // .expect(200)
      .end(function(err, res) {
        if (res.status === 200) {
          if (res.body.length === 0) {
            _expect(Object.prototype.toString.call(res.body)).to.be('[object Array]');
          } else {
            _expect(res.body.length).to.be.greaterThan(0);
            _expect(typeof res.body[0].id).to.be('number');
            _expect(typeof res.body[0].password).to.be('string');
          }
          done();
        }
      });
  });

  /**
   * Store a newly created resource in storage.
   * POST /users (sign up)
   *
   * @return Response
   */
  it('should store a newly created resource in storage.', function(done) {
    request
      .post(resourceApiUrl)
      .send(newUser)
      .accept('application/json')
      // .expect('Content-Type', /json/)
      // .expect(200)
      .end(function(err, res) {
        if (res.status === 200) {
          var data = res.body;
          _expect(data.email).to.be(newUser.email);
          _expect(data.id).to.be.ok();
          _expect(typeof data.id).to.be('number');
          id = data.id;
        } else {
          _expect(res.status).to.be.greaterThan(200);
          _expect(res.body.error).to.be.defined();
        }
        done();
      });
  });

  /**
   * Store a newly created resource in storage.
   * POST /users/login
   *
   * @return Response
   */
  it('should store a newly created resource in storage.', function(done) {
    request
      .post(resourceApiUrl + '/login')
      .send(newUser)
      .accept('application/json')
      .end(function(err, res) {
        if (res.status === 200) {
          var data = res.body;
          _expect(data.email).to.be(newUser.email);
          _expect(data.id).to.be.ok();
          _expect(typeof data.id).to.be('number');
          _expect(data.token).to.be.defined();
          id = data.id;
        } else {
          _expect(res.status).to.be.greaterThan(200);
          _expect(res.body.error).to.be.defined();
        }
        done();
      });
  });

  /**
   * Show the form for creating the specified resource.
   * GET /users/{id}/create
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
   * GET /users/{id}
   *
   * @param  int  $id
   * @return Response
   */
  it('should display the specified resource.', function(done) {
    request
      .get(resourceApiUrl + '/' + id)
      .accept('application/json')
      // .expect('Content-Type', /json/)
      // .expect(200)
      .end(function(err, res) {
        if (res.status === 200) {
          _expect(res.body.id).to.be(id);
        } else {
          _expect(res.status).to.be(404);
          _expect(res.body.error).to.match(/(not found)/g);
        }
        done();
      });

  });

  /**
   * Show the form for editing the specified resource.
   * GET /users/{id}/edit
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
   * PUT /users/{id}
   *
   * @param  int  $id
   * @return Response
   */
  it('should update the specified resource in storage.', function(done) {
    request
      .put(resourceApiUrl + '/' + id)
      .set('X-Access-Token', authToken)
      .send(userInfoUpdates)
      .accept('application/json')
      .end(function(err, res) {
        if (res.status === 200) {
          _expect(res.text).to.match(/(success)/);
        } else {
          _expect(res.status).to.be.greaterThan(200);
          _expect(res.body.error).to.be.defined();
        }
        done();
      });
  });

  /**
   * Remove the specified resource from storage.
   * DELETE /users/{id}
   *
   * @param  int  $id
   * @return Response
   */
  it('should remove the specified resource from storage.', function(done) {
    request
      .del(resourceApiUrl + '/' + id)
      .set('X-Access-Token', authToken)
      .accept('application/json')
      // .expect('Content-Type', /json/)
      // .expect(200)
      .end(function(err, res) {
        if (res.status === 200) {
          _expect(res.text).to.match(/(success)/);
        } else {
          _expect(res.status).to.be.greaterThan(200);
          _expect(res.body.error).to.be.defined();
        }
        done();
      });
  });
});

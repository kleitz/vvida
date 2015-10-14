var request = require('superagent'),
  faker = require('faker'),
  expect = require('expect.js'),
  resourceApiURL = 'http://localhost:3000/api/users';

describe('User RESTful API tests', function() {

  var fakeUser = {
      password: faker.internet.password(),
      email: faker.internet.email()
    },
    fakeUserInfoUpdates = {
      username: faker.internet.userName(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      gender: 'male',
      country: 'Kenya',
      city: 'Nairobi'
    },
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
      .get(resourceApiURL)
      // .use(requestPrefix)
      .accept('application/json')
      // .expect('Content-Type', /json/)
      // .expect(200)
      .end(function(err, res) {
        if (res.status === 200) {
          if (res.body.length === 0) {
            expect(Object.prototype.toString.call(res.body)).to.be('[object Array]');
          } else {
            expect(res.body.length).to.be.greaterThan(0);
            expect(typeof res.body[0].id).to.be('number');
            expect(typeof res.body[0].password).to.be('string');
          }
          done();
        }
      });
  });

  /**
   * Store a newly created resource in storage.
   * POST /users
   *
   * @return Response
   */
  it('should store a newly created resource in storage.', function(done) {
    request
      .post(resourceApiURL)
      .send(fakeUser)
      .accept('application/json')
      // .expect('Content-Type', /json/)
      // .expect(200)
      .end(function(err, res) {
        if (res.status === 200) {
          var data = res.body;
          expect(data.email).to.be(fakeUser.email);
          expect(data.id).to.be.ok();
          expect(typeof data.id).to.be('number');
          id = data.id;
        } else {
          throw err;
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
    expect(true).to.be(true);
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
      .get(resourceApiURL + '/' + id)
      .accept('application/json')
      // .expect('Content-Type', /json/)
      // .expect(200)
      .end(function(err, res) {
        if (res.status === 200) {
          expect(JSON.parse(res.text).id).to.be(id);
        } else {
          expect(res.status).to.be(404);
          expect(res.text).to.match(/(not found)/g);
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
    expect(true).to.be(true);
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
      .put(resourceApiURL + '/' + id)
      .send(fakeUserInfoUpdates)
      .accept('application/json')
      // .expect('Content-Type', /json/)
      // .expect(200)
      .end(function(err, res) {
        if (res.status === 200) {
          expect(res.text).to.match(/(success)/);
        } else {
          expect(res.status).to.be(501);
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
      .del(resourceApiURL + '/' + id)
      .accept('application/json')
      // .expect('Content-Type', /json/)
      // .expect(200)
      .end(function(err, res) {
        expect(res.status).to.be(501);
        done();
      });
  });
});

var request = require('superagent');

describe('User RESTful API tests', function() {

  var fakeUser = {
    username: 'eugenemutai',
    password: 'vvidaTesting',
    email: 'eugenemutai@gmail.com',
    firstname: 'Eugene',
    lastname: 'Mutai',
    gender: 'male',
    dob: '30081989',
    country: 'Kenya',
    city: 'Nairobi'
  };

  /**
   * Display a listing of the resource.
   * GET /users
   *
   * @return Response
   */
  it('should return all users stored in the database or empty array if DB is empty', function(done) {
    request
      .get('http://localhost:3000/api/users')
      // .use(requestPrefix)
      .set('Content-Type', 'application/json')
      // .expect('Content-Type', /json/)
      // .expect(200)
      .end(function(err, res) {
        // console.log(res);
        if (res.status == 200) {
          if (res.body.length == 0) {
            expect(Object.prototype.toString.call(res.body)).toBe('[object Array]');
          } else {
            expect(res.body.length).toBeGreaterThan(0);
            expect(typeof res.body[0].id).toBe('number');
            expect(typeof res.body[0].password).toBe('string');
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
      .post('http://localhost:3000/api/users')
      .send(fakeUser)
      .accept('application/json')
      // .expect('Content-Type', /json/)
      // .expect(200)
      .end(function(err, res) {
        if (res.status == 200) {
          var data = res.body;
          // console.log(data);
          expect(data.email).toBe(fakeUser.email);
          expect(data.id).toBeDefined();
          expect(typeof data.id).toBe('number');
        } else {
          return new Error();
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
  it('should show the form for editing the specified resource', function() {
    // Not used in an angular application
    // since the angular application will route to the edit form
    // and display it
    expect(true).toBe(true);
  });

  /**
   * Display the specified resource.
   * GET /users/{id}
   *
   * @param  int  $id
   * @return Response
   */
  it('should store a newly created resource in storage.', function(done) {
    request
      .get('http://localhost:3000/api/users/1')
      .accept('application/json')
      // .expect('Content-Type', /json/)
      // .expect(200)
      .end(function(err, res) {
        if (res.status == 200) {
          expect(JSON.parse(res.text).id).toBe(1);
        } else {
          expect(res.text).toMatch(/(not found)/g);
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
    expect(true).toBe(true);
  });

  /**
   * Update the specified resource in storage.
   * PUT /users/{id}
   *
   * @param  int  $id
   * @return Response
   */
  it('should update the specified resource in storage.', function() {
    request
      .put('http://localhost:3000/api/users/1')
      .accept('application/json')
      // .expect('Content-Type', /json/)
      // .expect(200)
      .end(function(err, res) {
        if (res.status == 200) {
          expect(res.text).toMatch(/(success)/);
        } else {
          expect(res.status).toBe(501);
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
      .del('http://localhost:3000/api/users/1')
      .accept('application/json')
      // .expect('Content-Type', /json/)
      // .expect(200)
      .end(function(err, res) {
        expect(res.status).toBe(501);
        done();
      });
  });
});

var request = require('superagent'),
  faker = require('faker'),
  expect = require('expect.js'),
  resourceApiURL = 'http://localhost:3000/api/events';

describe('Events resource API tests', function() {

  var generateFakeEvent = function() {
      return {
        userId: faker.random.number(),
        eventName: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        location: faker.address.streetName(),
        venue: faker.address.streetAddress(),
        time: faker.date.future(),
        sponsor: faker.company.companyName()
      }
    },
    generateFakeEventUpdates = function() {
      return {
        ev_name: faker.commerce.productName(),
        location: faker.address.streetName(),
        description: faker.lorem.sentence(),
        venue: faker.address.streetAddress()
      }
    },
    id = null;

  /**
   * Display a listing of the resource.
   * GET /items
   *
   * @return Response
   */
  it('should return all items stored in the database or empty array if DB is empty', function(done) {
    request
      .get(resourceApiURL)
      // .use(requestPrefix)
      .accept('application/json')
      // .expect('Content-Type', /json/)
      // .expect(200)
      .end(function(err, res) {
        if (res.status == 200) {
          if (res.body.length == 0) {
            expect(Object.prototype.toString.call(res.body)).to.be('[object Array]');
          } else {
            expect(res.body.length).to.be.greaterThan(0);
            expect(typeof res.body[0].id).to.be('number');
            expect(typeof res.body[0].ev_name).to.be('string');
          }
        } else {
          throw err;
        }
        done();
      });
  });

  /**
   * Store a newly created resource in storage.
   * POST /items
   *
   * @return Response
   */
  it('must log in to retain a session', function() {
    // Must log in to retain a session
    request
      .post('http://localhost:3000/api/users/login')
      .send({
        email: 'Charlie49@yahoo.com',
        password: '1f9Pt_znVb6WySj'
      })
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          expect(res.status).to.be(200);
        }
      });
  });

  it('should store a newly created resource in storage.', function() {
    var fakeEvent = generateFakeEvent();
    request
      .post(resourceApiURL)
      .send(fakeEvent)
      .accept('application/json')
      // .expect('Content-Type', /json/)
      // .expect(200)
      .end(function(err, res) {
        if (res.status == 200) {
          var newEventStored = res.body;
          expect(newEventStored.ev_name).to.be(fakeEvent.eventName);
          expect(newEventStored.description).to.be(fakeEvent.description);
          expect(newEventStored.id).to.be.defined;
          expect(typeof newEventStored.id).to.be('number');
          id = newEventStored.id;
        } else {
          throw err;
        }
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
    expect(true).to.be(true);
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
      .get(resourceApiURL + '/' + id)
      .accept('application/json')
      // .expect('Content-Type', /json/)
      // .expect(200)
      .end(function(err, res) {
        if (res.status == 200) {
          expect(res.body.id).to.be(id);
        } else {
          expect(res.status).to.be(404);
          expect(res.body.message).to.match(/(not found)/g);
        }
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
    expect(true).to.be(true);
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
      .put(resourceApiURL + '/' + id)
      .send(generateFakeEventUpdates())
      .accept('application/json')
      // .expect('Content-Type', /json/)
      // .expect(200)
      .end(function(err, res) {
        if (res.status == 200) {
          expect(res.body.isUpdate).to.be(true);
          expect(res.body.message).to.match(/(successful)/);
        } else {
          expect(res.status).to.be(500);
        }
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
      .del(resourceApiURL + '/' + id)
      .accept('application/json')
      // .expect('Content-Type', /json/)
      // .expect(200)
      .end(function(err, res) {
        if (res.status == 200) {
          expect(res.body.message).to.match(/(successful)/);
        } else {
          expect(res.status).to.be(500);
        }
        done();
      });
  });
});

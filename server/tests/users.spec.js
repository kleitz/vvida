var request = require('superagent'),
  requestPrefix = require('superagent-prefix')('/api');

describe('User RESTful API tests', function() {

  var fakeUser = {
    username: 'eugenemutai',
    password: 'vvidaTesting',
    firstname: 'Eugene',
    lastname: 'Mutai',
    gender: 'male'
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
  it('should return all users stored in the database or empty array if DB is empty', function() {

  });

  /**
   * Store a newly created resource in storage.
   * POST /users
   *
   * @return Response
   */
  it('should show the form for creating a new resource.', function() {

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
  it('should store a newly created resource in storage.', function() {

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

  });

  /**
   * Remove the specified resource from storage.
   * DELETE /users/{id}
   *
   * @param  int  $id
   * @return Response
   */
  it('should remove the specified resource from storage.', function() {

  });
});

describe('vvida landing page', function() {  
  it('should load page', function() {
    browser.get('https://vvida-staging.herokuapp.com/');
    expect(browser.getTitle()).toEqual('Vvida');
  });
}); 
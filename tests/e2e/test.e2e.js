// simple test to check the title and heading h2 of the browser
describe('vvida landing page', function() {  
  it('should check title of loaded landing page', function() {
    browser.get('https://vvida-staging.herokuapp.com/');
    expect(browser.getTitle()).toEqual('Vvida');
  });
  it('should check the heading h2 on landing page', function() {
    browser.get('https://vvida-staging.herokuapp.com/');
    expect(element(by.tagName('h2'))).toEqual('WELCOME HOME');
  });
}); 
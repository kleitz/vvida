module.exports = function(app, config, passport) {
  require('./users')(app, config, passport);
  /* GET home page. */
  app.get('/*', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.sendFile('index.html', {
      root: './public/'
    });
  });
};
//
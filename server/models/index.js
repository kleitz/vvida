//var require the seqalize module
var sequelize = require('../config/db-connect');

// load models
var models = [
  'categories',
  'countries',
  'events',
  'images',
  'items',
  'promotions',
  'messages',
  'notifications',
  'rating',
  'reviews',
  'rsvp',
  'users'
];

// add them to be exported in one go
models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// describe relationships
(function(m) {
  // in here
  // m.PhoneNumber.belongsTo(m.User);
  // m.Task.belongsTo(m.User);
  // m.User.hasMany(m.Task);
  // m.User.hasMany(m.PhoneNumber);
})(module.exports);

// export connection
module.exports.sequelize = sequelize;


var sequelize = new Sequelize('vvida', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;
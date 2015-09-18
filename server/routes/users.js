module.exports = function(app, config) {
    app.get('/users', function(req, res) {
        res.send([]);
    });
};

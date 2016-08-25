var _ = require('lodash');
var Coffee = require('../models/coffee')

module.exports = function(app) {
  app.get('/api/coffee', function(req, res) {
    res.json(Coffee.all());
  });

  app.get('/api/coffee/:id', function(req, res) {
    var coffeeId = parseInt(req.param('id'), 10);
    res.json(Coffee.get(coffeeId) || {});
  });

  app.get('/api/coffeeByOrigin/:id', function(req, res) {
    var coffeeId = parseInt(req.param('id'), 10);
    res.json(Coffee.get(coffeeId) || {});
  });

};

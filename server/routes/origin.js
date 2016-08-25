var Origin = require('../models/origin');

module.exports = function(app) {
  // Return a list of available node types
  app.get('/api/origin', function(req, res) {
    res.json(Origin.all());
  });

  app.get('/api/origin/:id', function(req, res) {
    var originId = parseInt(req.param('id'), 10);
    res.json(Origin.get(originId) || {});
  });
};

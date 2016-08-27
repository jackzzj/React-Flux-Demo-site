var _ = require('lodash');
var Subscription = require('../models/subscription')

module.exports = function(app) {
  app.get('/api/subscription', function(req, res) {
    res.json(Subscription.all());
  });

  app.post('/api/subscription', function(req, res) {
    // Add a delay here to simulate the delay of a live server
    // So things like button isSubmitting states can be demonstrated
    setTimeout(function(){
      res.json(Subscription.create(req.body));
    }, 1000);
  });

};

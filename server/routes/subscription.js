var _ = require('lodash');
var Subscription = require('../models/subscription')

module.exports = function(app) {
  app.get('/api/subscriptions', function(req, res) {
    res.json(Subscription.all());
  });

  app.post('/api/subscriptions', function(req, res) {
    // Add a delay here to simulate the delay of a live server
    // So things like button isSubmitting states can be demonstrated
    setTimeout(function(){
      res.json(Subscription.create(req.body));
    }, 1000);
  });

  app.put('/api/subscriptions/:id', function(req, res) {
    // Add a delay here to simulate the delay of a live server
    // So things like button isSubmitting states can be demonstrated
    setTimeout(function(){
      res.json(Subscription.update(req.body));
    },1000)
  });

  app.get('/api/subscriptions/:id', function(req, res) {
    var subscriptionId = parseInt(req.param('id'), 10);
    res.json(Subscription.get(subscriptionId) || {});
  });

  app.delete('/api/subscriptions/:id', function(req, res) {
    res.json(Subscription.delete(parseInt(req.param('id'), 10)) || {});
  });
};

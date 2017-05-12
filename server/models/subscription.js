var _ = require('lodash');
var Coffee = require('./coffee');
var Origin = require('./origin');
var subscriptions = [
  {"id":1 ,"userName": "Jack", "coffeeId": 2, "email": "abc@icloud.com", "phone": "639-000-1234", "startDate": "2016-08-27T06:15:47.972Z", "months": 6, "quantityPerMonth": 2},
  {"id":2 ,"userName": "Aderson", "coffeeId": 3, "email": "abc@icloud.com", "phone" : "639-111-1234", "startDate": "2016-08-27T06:15:47.972Z", "months": 12, "quantityPerMonth": 1},
]
var lastId = 6;

var buildSubscriptions = function() {
  // Make a deep copy so we don't change the main array
  var rawSubscriptions = JSON.parse(JSON.stringify(subscriptions));
  var builtSubscriptions = [];
  var subscription;

  for(var i=0, l=rawSubscriptions.length; i < l; i++) {
    subscription = rawSubscriptions[i];
    subscription.coffee = Coffee.get(subscription.coffeeId);
    builtSubscriptions.push(subscription);
  }
  return builtSubscriptions
}

module.exports = {
  all: function() {
    return buildSubscriptions();
  },
  create: function(subscription) {
    lastId += 1;
    subscription.id = lastId;
    subscription.coffee = Coffee.get(subscription.coffeeId);
    subscriptions.push(subscription)
    return subscription;
  }
}

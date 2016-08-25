var _ = require('lodash');
var Coffee = require('./coffee')
var User = require('./user')
var subscription = [
  {"id":1 ,"userId": 13, "categoryId": 8, "description": "NgModel Best Practice", "content" : "Always use dot syntax when using NgModel! Treat Scope as read-only in templates & write-only in controllers. The purpose of the scope is to refer to the model, not be the model. The model is your javascript objects. When doing bidirectional binding with ngModel make sure you don't bind directly to the scope properties. This will cause unexpected behavior in the child scopes.", "title" : "NgModel BP"},
  {"id":2 ,"userId": 2, "categoryId": 3, "description" : "Markers on a **DOM element** that tell AngularJS's HTML compiler `$compile` to attach a specified behavior to that DOM element.", "title" : "Directives", "content": "Markers on a **DOM element**"},
  {"id":3 ,"userId": 1, "categoryId": 6, "description" : "Clarify the confusion between Service the term and `service` the angular method and to explain the 5 different Service recipes in Angular.", "title" : "Service Service? Really Angular?","content": "There are 5 Recipes used to create a Service. One of those *was* unfortunately named, Service. So yes, amongst its fellow peers such as Provider Service and Factory Service, there is in fact a Service Service."},
  {"id":4 ,"userId": 2, "categoryId": 6, "description" : "QUESTIONABLE DESCRIPTION GOES HERE", "title" : "TEST TEST TEST", "content": "QUESTIONABLE CONTENT GOES HERE"},
  {"id":5 ,"userId": 4, "categoryId": 6, "description" : "Define Service", "title" : "What is a Service", "content": "Service: Angular services are objects that are wired together using dependency injection (DI). You can use services to organize and share code across your app."},
  {"id":6 ,"userId": 5, "categoryId": 6, "description" : "Steps for Creating a Service", "title" : "How do you create a Service?", "content": "You can register a service to our Angular module `app` with a one of the following 5 recipes: \\n 	- **factory**  \\n 	- **provider**  \\n 	- **service**  \\n 	- **value**  \\n 	- **constant** "}
]
var lastId = 6;

var buildSubscriptions = function() {
  // Make a deep copy so we don't change the main array
  var rawSubscriptions = JSON.parse(JSON.stringify(subscriptions));
  var builtSubscriptions = [];
  var subscription;

  for(var i=0, l=rawSubscriptions.length; i < l; i++) {
    subscription = rawSubscriptions[i];
    subscription.user = User.get(subscription.userId);
    subscription.category = Origin.get(subscription.categoryId);
    builtSubscriptions.push(subscription);
  }
  return builtSubscriptions
}

module.exports = {
  get: function(id) {
    return _.find(buildSubscriptions(), function(subscription){
      return subscription.id === id;
    });
  },
  all: function() {
    return buildNotes();
  },
  update: function(subscription) {
    var updatedSubscription;
    for(var i=0, l=subscriptions.length; i < l; i++) {
      if(subscriptions[i].id === subscription.id){
        _.assign(subscriptions[i], subscription);
        updatedSubscription = subscriptions[i];
        break;
      }
    }
    return updatedSubscription;
  },
  delete: function(id) {
    var deletedSubscription;
    for(var i=0, l=subscriptions.length; i < l; i++) {
      if(subscriptions[i].id === id){
        deletedSubscription = subscriptions[i];
        subscriptions.splice(i, 1);
        break;
      }
    }
    return deletedSubscription;
  },
  create: function(subscription) {
    lastId += 1;
    subscription.id = lastId;
    subscriptions.push(subscription)
    return subscription;
  }
}

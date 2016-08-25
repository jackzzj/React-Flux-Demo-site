var _ = require('lodash');
var Origin = require('./origin')
var coffees = [{
  "id": 1,
  "originId": 1,
  "description": "NgModel Best Practice",
  "name": "Arabica Cooperative",
  "image": [
    "/assets/images/arabica.jpg",
    "/assets/images/kenya-big.jpg"
  ]
}, {
  "id": 2,
  "originId": 2,
  "description": "Markers on a **DOM element** that tell AngularJS's HTML compiler `$compile` to attach a specified behavior to that DOM element.",
  "name": "Honduras Marcala",
  "image": [
    "/assets/images/honduras.jpg",
    "/assets/images/mandheling-big.jpg"
  ]
}, {
  "id": 3,
  "originId": 2,
  "description": "Clarify the confusion between Service the term and `service` the angular method and to explain the 5 different Service recipes in Angular.",
  "name": "Colombia Huila",
  "image": [
    "/assets/images/huila.jpg",
    "/assets/images/kenya-big.jpg"
  ]
}, {
  "id": 4,
  "originId": 3,
  "description": "QUESTIONABLE DESCRIPTION GOES HERE",
  "name": "Kenya Gichathaini",
  "image": [
    "/assets/images/kenya.jpg",
    "/assets/images/mandheling-big.jpg"
  ]
}, {
  "id": 5,
  "originId": 4,
  "description": "Define Service",
  "name": "Hawaii Kona",
  "image": [
    "/assets/images/kona.jpg",
    "/assets/images/kenya-big.jpg"
  ]
}, {
  "id": 6,
  "originId": 5,
  "description": "Steps for Creating a Service",
  "name": "Indonesia Mandheling",
  "image": [
    "/assets/images/mandheling.jpg",
    "/assets/images/mandheling-big.jpg"
  ]
}, {
  "id": 7,
  "originId": 6,
  "description": "Steps for Creating a Service",
  "name": "Guatemala Pacamara",
  "image": [
    "/assets/images/pacamara.jpg",
    "/assets/images/kenya-big.jpg"
  ]
}, {
  "id": 8,
  "originId": 1,
  "description": "Steps for Creating a Service",
  "name": "Rwanda CWS",
  "image": [
    "/assets/images/rowanda.jpg",
    "/assets/images/mandheling-big.jpg"
  ]
}, {
  "id": 9,
  "originId": 7,
  "description": "Steps for Creating a Service",
  "name": "Ethiopia Yirgacheffe",
  "image": [
    "/assets/images/yirgacheffe.jpg",
    "/assets/images/kenya-big.jpg"
  ]
}]

var buildCoffees = function() {
  // Make a deep copy so we don't change the main array
  var rawCoffees = JSON.parse(JSON.stringify(coffees));
  var builtCoffees = [];
  var coffee;

  for(var i=0, l=rawCoffees.length; i < l; i++) {
    coffee = rawCoffees[i];
    coffee.origin = Origin.get(coffee.originId);
    builtCoffees.push(coffee);
  }
  return builtCoffees
}

module.exports = {
  get: function(id) {
    return _.find(buildCoffees(), function(coffee) {
      return coffee.id === id;
    });
  },
  all: function() {
    return buildCoffees();
  }
}

var _ = require('lodash');

var origins = [
  {"id": 1, "name": "Rwanda"},
  {"id": 2, "name": "Colombia"},
  {"id": 3, "name": "Kenya"},
  {"id": 4, "name": "Hawaii"},
  {"id": 5, "name": "Indonesia Sumatra"},
  {"id": 6, "name": "Guatemala"},
  {"id": 7, "name": "Ethiopia"}
]

module.exports = {
  get: function(id) {
    return _.find(origins, function(origin){
      return origin.id === id;
    });
  },
  all: function() {
    return origins;
  }
}

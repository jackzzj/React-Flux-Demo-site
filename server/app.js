var express = require('express');
var app = express();

require('./expressConfig')(app, express);

// Root route
app.get('/', function(req, res) {
  res.sendfile('index.html', {
    root: app.settings.views
  });
});

// Load routes
require('./routes/coffee')(app); //coffee routes
require('./routes/origin')(app); //origin routes
require('./routes/subscription')(app); //subscription routes


// Start the server
var server = app.listen(8000, function() {
  console.log('Listening on port %d', server.address().port);
});

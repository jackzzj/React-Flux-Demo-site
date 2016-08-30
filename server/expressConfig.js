var bodyParser = require('body-parser');

module.exports = function(app, express) {

  //Production needs physical files! (built via separate process)
  // Serve static assets from the app folder. This enables things like javascript
  // and stylesheets to be loaded as expected. You would normally use something like
  // nginx for this, but this makes for a simpler demo app to just let express do it.

  app.use("/", express.static("public/"));
  //app.use('/vendor/bootstrap', express.static(__dirname + '/../node_modules/bootstrap/dist/'));
  //app.use('/vendor/jquery', express.static(__dirname + '/../node_modules/jquery/dist/'));

  // Set the view directory, this enables us to use the .render method inside routes
  app.set('views', __dirname + '/../public');

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({
    extended: false
  }));

  // parse application/json
  app.use(bodyParser.json());
}

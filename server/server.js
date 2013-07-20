(function() {
  var app;

  require('coffee-script');

  app = require('./app');

  module.exports = app.listen(app.get('port'), function() {
    return console.log("Express server listening on port " + app.get('port'));
  });

}).call(this);

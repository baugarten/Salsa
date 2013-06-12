var passport = require('./config/passport');
module.exports = function(app) {
  var users = require('./controllers/users'),
      organizations = require('./controllers/organizations'),
      scripts = require('./controllers/scripts');

  app.get('/signin', users.showsignin);
  app.post('/signin', function(a,b,next) { console.log("SIGNING"); next(); }, passport.authenticate('local'), users.signin);

  app.get('/signup', users.showreg);
  app.post('/signup', users.handlereg);

  app.get('/dashboard/:organization_id', organizations.dash);

  app.configure('production', function() {
    app.get('/picante', scripts.initscript(true));
    app.get('/edit', scripts.editscript(true));
  });
  app.configure('development', 'test', function() {
    app.get('/picante', scripts.initscript(false));
    app.get('/edit', scripts.editscript(false));
  });
  app.get('/test', scripts.testpage);
}

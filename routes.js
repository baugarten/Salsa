module.exports = function(app) {
  var users = require('./controllers/users'),
      organizations = require('./controllers/organizations');

  app.get('/signup', users.showreg);
  app.post('/signup', users.handlereg);

  app.get('/dashboard/:organization_id', organizations.dash);
}

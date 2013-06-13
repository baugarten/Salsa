var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    User = mongoose.model('User');

passport.serializeUser(function(user, done) {
  return done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id).populate('organizations').exec(done);
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    console.log(err, user);
    if (err) return done(err);
    if (!user || !user.authenticate(password)) {
      return done(null, false, { message: "Incorrect email/password combination" });
    }
    return done(null, user);
  });
})); 

exports = module.exports = passport;

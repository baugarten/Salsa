passport = require('passport')
LocalStrategy = require('passport-local').Strategy
mongoose = require('mongoose')
User = mongoose.model('User')

passport.serializeUser (user, done) ->
  return done(null, user._id)

passport.deserializeUser (id, done) ->
  User.findById(id).populate('organizations').exec(done)

passport.use new LocalStrategy
  usernameField: 'email'
  passwordField: 'password'
, (email, password, done) ->
  User.findOne { email: email }, (err, user) ->
    return done(err) if (err)
    if (!user or !user.authenticate(password))
      return done(null, false, { message: "Incorrect email/password combination" })

    done(null, user)

exports = module.exports = passport

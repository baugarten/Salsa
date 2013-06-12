var mongoose = require('mongoose'),
  async = require('async'),
  User = mongoose.model('User'),
  Organization = mongoose.model('Organization');

exports.showreg = function(req, res) {
  res.render('users/signup', {
    title: "Sign Up!",
    company_size_options: [
      '1', '2-10', '11-25', '26-100', '101-500', '501+'
    ]
  });
};

exports.showsignin = function(req, res) {
  res.render('users/signin', {
    title: "Sign In!",
  });
};

exports.handlereg = function(req, res) {
  var user = new User(req.body),
    organization = new Organization(req.body);
  async.parallel([
    function(callback) {
      user.validate(callback);
    },
    function(callback) {
      organization.validate(callback);
    }
  ], function(err, results) {
    if (err) {
      return res.send(400, err);
    }
    user.save(function(err) {
      if (err) {
        return res.send(400, err);
      }
      organization.users.push(user);
      organization.save(function(err) {
        if (err) {
          user.remove();
          res.send(400, err);
        }
        user.organizations.push(organization);
        user.save(function(err) {
          if (err) {
            user.remove();
            organization.remove();
            res.send(400, err);
          }
          res.send(201);
        });
      });
    });
  });
};

exports.signin = function(req, res) {
  res.redirect('/');
};

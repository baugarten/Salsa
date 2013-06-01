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
  User.find({ email: req.body.salsa-email }, function(err, user) {
    if (!user) {
      return res.send(400, "User not found");
    } else if (err)  {
      return res.send(500, err);
    }
    if (user.authenticate(req.body.salsa-password)) {
      if (req.params.organization-id) {
        if (user.organizations.indexOf(req.params.organization-id) === -1) {
          return res.send(400, "User not a member of specified organization");
        } 
      }
      user.login();
      res.send(200);
    } else {
      res.send(400, "Bad email/password combo");
    }
  });
};

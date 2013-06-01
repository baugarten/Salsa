var mongoose = require('mongoose'),
  async = require('async'),
  User = mongoose.model('User'),
  Organization = mongoose.model('Organization'),
  Factory = require('factory-lady');


exports.seedDb = function(cb) {
  exports.clearDb(function() {
    var emailCounter = 0,
        orgCounter = 0,
        subCounter = 0,
        numUsers = 10,
        numOrganizations = 10;
    Factory.define('User', User, {
      email: function(cb) { cb('user' + emailCounter++ + '@example.com'); },
      password: 'password',
      jobtitle: 'nobody',
      fullname: 'noone',
    });
    Factory.define('Organization', Organization, {
      name: function(cb) { cb('org' + orgCounter++); },
      url: 'http://example.com',
      subdomain: function(cb) { cb('www' + subCounter++); },
      size: '1',
      phone: '18230981239',
    });
    var users = [],
      orgs = [];
    async.parallel([
      function(done) {
        async.whilst(
          function() { return numUsers-- >= 0; }, 
          function(cb) {
            Factory('User', function(user) { 
              users.push(user);
              cb(); 
            });
          },
          function(err) {
            done();
          }
        );
      },
      function(done) {
        async.whilst(
          function() { return numOrganizations-- >= 0; }, 
          function(cb) {
            Factory('Organization', function(org) { 
              orgs.push(org);
              cb(); 
            });
          },
          function(err) {
            done();
          }
        );
      },
    ], function() {
      console.log("Done!");
      
      cb({
        "users": users,
        "organizations": orgs,  
      }); 
    });
  });
};

exports.clearDb = function(done) {
  async.parallel([
    function (cb) {
      User.remove().exec(function () {
        cb();
      })
    },
    function (cb) {
      Organization.remove().exec(function () {
        cb();
      })
    }
  ], done)
};

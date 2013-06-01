var express = require('express'),
  mongoose = require('mongoose'),
  scripts = require('../scripts'),
  path = require('path'),
  rootPath = path.normalize(__dirname + '/..');

module.exports = function(app) {
  var config = require("./config")[process.env.NODE_ENV || 'development'];

  app.configure(function() {
    app.set('views', rootPath + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
  });

  app.configure('development', 'test', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(require('less-middleware')({ src: rootPath + '/public/src' }));
    app.use(express.static(rootPath + '/public/src'));
  });

  app.configure('production', function() {
    app.use(express.errorHandler());
    app.use(express.static(rootPath + '/public/out'));
  });

  mongoose.connect(config.db, function(err, res) {
    if (err) {
      console.log("Could not connect to mongo", err);
    }
  });
};

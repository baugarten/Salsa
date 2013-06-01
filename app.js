var express = require('express'),
    FTPClient = require('ftp'),
    client = new FTPClient(),
    fs = require('fs'),
    mongoose = require('mongoose'),
    scripts = require('./scripts'),
    app = express(),
    initscript = scripts.init(),
    editscript;

process.env.PORT = process.env.PORT || 3000;

require('./config/express')(app);

var models_path = __dirname + '/models';
fs.readdirSync(models_path).forEach(function (file) {
  if (file.match(/(swp|~)$/)) {
    return; // ignore tmp files
  }
  require(models_path+'/'+file);
});

var Organization = mongoose.model('Organization'),
    User = mongoose.model('User');

app.post('/validate', function(req, res, next) {
});

app.post('/put', function(req, res, next) {
  console.log(req.body);
});

app.get('/', function(req, res, next) {
  res.render('index', {
    title: "Hey There!"  
  });
});

require('./routes')(app);

app.listen(process.env.PORT);

exports = module.exports = app;

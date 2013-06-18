var express = require('express'),
    FTPClient = require('ftp'),
    client = new FTPClient(),
    fs = require('fs'),
    mongoose = require('mongoose'),
    scripts = require('./scripts'),
    config = require('./config/config')[process.env.NODE_ENV || 'development'],
    app = express(),
    initscript = scripts.init(),
    editscript;

process.env.PORT = process.env.PORT || 3000;

var models_path = __dirname + '/models';
fs.readdirSync(models_path).forEach(function (file) {
  if (file.match(/(swp|~)$/)) {
    return; // ignore tmp files
  }
  require(models_path+'/'+file);
});

var Organization = mongoose.model('Organization'),
    User = mongoose.model('User');

require('./config/express')(app);

app.post('/validate', function(req, res, next) {
});

app.post('/put', function(req, res, next) {
  console.log(req.body);
});

app.get('/', function(req, res, next) {
  Organization.find({}, function(err, orgs) {
    orgs[0]._id
    console.log(orgs);
    res.render('index', {
      title: "Hey There!", 
      base_url: config.SERVER_NAME,
      org_id: orgs[0]._id
    });
  });
});

require('./routes')(app);

app.listen(process.env.PORT);

exports = module.exports = app;

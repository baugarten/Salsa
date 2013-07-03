var express = require('express'),
    FTPClient = require('ftp'),
    client = new FTPClient(),
    fs = require('fs'),
    mongoose = require('mongoose'),
    scripts = require('./scripts'),
    config = require('./config/config')[process.env.NODE_ENV || 'development'],
    check = require('validator').check,
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
    User = mongoose.model('User'),
    Email = mongoose.model('Email');

require('./config/express')(app);

app.post('/validate', function(req, res, next) {
});

app.post('/put', function(req, res, next) {
  console.log(req.body);
});

app.post('/mailing/signup', function(req, res, next) {
  try {
    check(req.body.email).isEmail();
  } catch (e) {
    console.log(e);
    res.send(400, { status: 'failure', message: e.message });
  }
  
  var email = new Email({
    email: check(req.body.email).len(6,64).isEmail()
  })
  email.save(function(err, email) {
    if (err) {
      res.send(500, err);
    } else if (!email) {
      res.send(400, { status: 'failure', message: "Bad email" });
    } else {
      res.send(201, { status: 'success', email: email });
    }
  });
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

app.post('/mercury/save', function(req, res, next) {
  res.json(200, {}); 
});

require('./routes')(app);

app.listen(process.env.PORT);

exports = module.exports = app;

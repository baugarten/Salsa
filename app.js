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

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
});

app.configure('development', function() {
  app.SERVER_NAME = "http://localhost:" + process.env.PORT;

  editscript = scripts.uncompressedEdit();

  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(require('less-middleware')({ src: __dirname + '/public/src' }));
  app.use(express.static(__dirname + '/public/src'));
  app.mongoUri = "mongodb://localhost/salsa";
});

app.configure('production', function() {
  app.SERVER_NAME = "http://salsa-fresca.herokuapp.com";

  editscript = scripts.compressedEdit();
  
  app.use(express.errorHandler());
  app.use(express.static(__dirname + '/public/out'));
  app.mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL;
});

mongoose.connect(app.mongoUri, function(err, res) {
  if (err) {
    console.log("Could not connect to mongo", err);
  }
});

var models_path = __dirname + '/models';
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path+'/'+file);
});
var Organization = mongoose.model('Organization'),
    User = mongoose.model('User');

app.use(express.bodyParser());

var replacing = {
  SERVER_NAME: app.SERVER_NAME,
  ORGANIZATION_ID: function(req) {
    return req.body.organization_id || req.query.organization_id || -1;
  },
  ORGANIZATION_SERVERS: function(req) {
    return (req.organization && req.organization.servers) || [];
  },
};

app.get('/script', validateOrganization, sendScript(initscript));

app.get('/edit', validateOrganization, sendScript(editscript));

app.post('/validate', function(req, res, next) {
});

app.post('/register', function(req, res, next) {
  
});

app.post('/put', function(req, res, next) {
  console.log(req.body);
});

app.get('/', function(req, res, next) {
  res.render('index', {
    title: "Hey There!"  
  });
});
app.get('/signup', function(req, res, next) {
  res.render('users/register', {
    title: "Sign Up!",
    company_size_options: [
      '1', '2-10', '11-25', '26-100', '101-500', '501+'
    ] 
  });
});

function sendScript(script) {
  return function(req, res, next) {
    res.type('application/javascript');
    res.send(200, script(replacing, req));
  }
}

function validateOrganization(req, res, next) {
  var organization_id = req.body.organization_id || req.query.organization_id || -1;
  if (organization_id === -1 ) {
    return res.send(400, "Sorry, you didn't include your organization id in the request");
  }
  Organization.findById(organization_id, function(err, organization) {
    if (!organization) {
      return res.send(400, "Sorry, we couldn't find your organization :(");
    }
    req.organization = organization;
    next(err);
  });
}

app.listen(process.env.PORT);

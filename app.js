var express = require('express'),
    FTPClient = require('ftp'),
    client = new FTPClient(),
    fs = require('fs'),
    mongoose = require('mongoose'),
    uglifyjs = require('uglify-js'),
    scripts = require('./scripts'),
    app = express(),
    initscript = fs.readFileSync('scripts/salsa.picante.js'),
    editscript;

process.env.PORT = process.env.PORT || 3000;

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  editscript = { code: '' };
  scripts.forEach(function(filename, i) {
    var file = fs.readFileSync(filename, 'utf-8');
    if (i > 0) {
      editscript.code += "\n\n";
    }
    editscript.code += "/* source: " + filename + " */\n\n" + file;
  });
  app.mongoUri = "mongodb://localhost/salsa";
  app.SERVER_NAME = "http://localhost:" + process.env.PORT;
});

app.configure('production', function() {
  app.use(express.errorHandler());
  editscript = uglifyjs.minify(scripts),
  app.mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL;
  app.SERVER_NAME = "http://salsa-fresca.herokuapp.com";
});

mongoose.connect(app.mongoUri, function(err, res) {
  if (err) {
    console.log("Could not connect to mongo", err);
  }
});

var replacing = {
  SERVER_NAME: app.SERVER_NAME,
  CLIENT_ID: function(req) {
    return req.body.client_id || req.query.client_id || -1;
  }
};

app.use(express['static'](__dirname));
app.use(express.bodyParser());

app.get('/script', function(req, res, next) {
  if (!req.body.client_id && !req.query.client_id) {
    return res.send(400, "Sorry, you didn't include your client id in the request");
  }
  var retscript = prependConfig(req, initscript);
  res.type('application/javascript');
  res.send(200, retscript);
});

app.get('/edit', function(req, res, next) {
  if (!req.body.client_id && !req.query.client_id) {
    return res.send(400, "Sorry, you didn't include your client id in the request");
  }
  var retscript = prependConfig(req, editscript.code);
  res.type('application/javascript');
  res.send(200, retscript);
});

app.post('/validate', function(req, res, next) {
});

app.post('/put', function(req, res, next) {
  console.log(req.body);
});

app.listen(process.env.PORT);

function prependConfig(req, string) {
  var prepend = "";
  for (var key in replacing) {
    prepend = prepend + "\n" +
      "var " + key + " = '" + ((isFunction(replacing[key])) ? replacing[key](req) : replacing[key]) + "';";
  }
  return prepend + '\n' + string;
}

function isFunction(object) {
  return object && {}.toString.call(object) === '[object Function]';
}

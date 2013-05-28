var express = require('express'),
    FTPClient = require('ftp'),
    client = new FTPClient(),
    fs = require('fs'),
    mongoose = require('mongoose'),
    uglifyjs = require('uglify-js'),
    scripts = require('./scripts'),
    app = express(),
    script;

process.env.PORT = process.env.PORT || 3000;

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  script = { code: '' };
  scripts.forEach(function(filename, i) {
    var file = fs.readFileSync(filename, 'utf-8');
    if (i > 0) {
      script.code += "\n\n";
    }
    script.code += "/* source: " + filename + " */\n\n" + file;
  });
  app.SERVER_NAME = "http://localhost:" + process.env.PORT;
});
app.configure('production', function() {
  app.use(express.errorHandler());
  script = uglifyjs.minify(scripts),
  app.SERVER_NAME = "http://salsa-fresca.herokuapp.com";
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
  var prepend = "";
  for (var key in replacing) {
    console.log(key);
    prepend = prepend + "\n" +
      "var " + key + " = '" + ((isFunction(replacing[key])) ? replacing[key](req) : replacing[key]) + "';";
  }
  var retscript = prepend + '\n' + script.code;
  res.send(200, retscript);
});

app.post('/put', function(req, res, next) {
  console.log(req.body);
});

app.listen(process.env.PORT);

function isFunction(object) {
  return object && {}.toString.call(object) === '[object Function]';
}

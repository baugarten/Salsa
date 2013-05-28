var uglifyjs = require('uglify-js');
  fs = require('fs');

var scripts = [
    "jquery.min.js",
    "jquery-te-1.4.0.min.js",
    "jquery.magnific-popup.min.js",
    "salsa.fresca.js",
    "salsa.js"
  ],
  initscript = fs.readFileSync('scripts/salsa.picante.js'),
  editscript;

scripts = scripts.map(function(file) {
  return "scripts/" + file;
});

function composeScript(script) {
  return function(prepend, req) {
    return prependConfig(script, prepend, req);
  };
}

function prependConfig(script, prepending, req) {
  var prepend = "";
  for (var key in prepending) {
    prepend = prepend + "\n" +
      "var " + key + " = '" + ((isFunction(prepending[key])) ? prepending[key](req) : prepending[key]) + "';";
  }
  return prepend + '\n' + script;
}

function isFunction(object) {
  return object && {}.toString.call(object) === '[object Function]';
}

module.exports = {
  init: function() {
    return composeScript(initscript);
  },
  uncompressedEdit: function() {
    var editscript = '';
    scripts.forEach(function(filename, i) {
      var file = fs.readFileSync(filename, 'utf-8');
      if (i > 0) {
        editscript += "\n\n";
      }
      editscript += "/* source: " + filename + " */\n\n" + file;
    });
    return composeScript(editscript);
  },
  compressedEdit: function() {
    return composeScript(uglifyjs.minify(scripts).code);
  }
};

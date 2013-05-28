var scripts = [
  "jquery.min.js",
  "jquery-te-1.4.0.min.js",
  "jquery.magnific-popup.min.js",
  "salsa.fresca.js",
  "salsa.js"
];
scripts = scripts.map(function(file) {
  return "scripts/" + file;
});
module.exports = scripts;

var scripts = require('../scripts'),
    config = require('../config/config')[process.env.NODE_ENV || 'development'],
    Organization = require('mongoose').model('Organization'),
    initscript = scripts.init(),
    editscript;


exports.initscript = function(compress) {
  return [ validateOrganization, sendScript(initscript) ];
};
exports.editscript = function(compress) {
  editscript = compress ? scripts.compressedEdit() : scripts.uncompressedEdit();
  return [ validateOrganization, sendScript(editscript) ];
};

exports.testpage = function(req, res) {
  res.render(req.url.substr(1));
};

function sendScript(script) {
  return function(req, res, next) {
    res.type('application/javascript');
    res.send(200, script(replacing, req));
  }
}

var replacing = {
  SERVER_NAME: config.SERVER_NAME,
  ORGANIZATION_ID: function(req) {
    return req.body.organization_id || req.query.organization_id || -1;
  },
  ORGANIZATION_SERVERS: function(req) {
    return (req.organization && req.organization.servers) || [];
  },
};

function validateOrganization(req, res, next) {
  console.log("Validate Organization")
  var organization_id = req.body.organization_id || req.query.organization_id || -1;
  if (organization_id === -1 ) {
    return res.send(400, "Sorry, you didn't include your organization id in the request");
  }
  console.log("looking for organization")
  Organization.findById(organization_id, function(err, organization) {
    console.log("Found organization", organization_id, organization);
    if (!organization) {
      return res.send(400, "Sorry, we couldn't find your organization :(");
    }
    req.organization = organization;
    next(err);
  });
}

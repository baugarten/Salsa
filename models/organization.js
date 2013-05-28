var mongoose = require('mongoose');

var OrganizationSchema = new mongoose.Schema({
  name: { type: 'string', required: true },
  subdomain: { type: 'string', required: true },
  size: { type: 'string', required: true },
  phone: { type: 'string', required: true },
  mailing: { type: 'string', required: true },
  users: [ { type: 'ObjectId', ref: 'User' } ],
  servers: [ String ]
});

mongoose.model('Organization', OrganizationSchema);
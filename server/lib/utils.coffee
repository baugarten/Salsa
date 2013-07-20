mongoose = require('mongoose')
Organization = mongoose.model('Organization')

module.exports =
  validateOrganization: (req, res, next) ->
    organization_id = req.body.organization_id or req.query.organization_id or -1
    if (organization_id == -1 )
      return res.send(400, "Sorry, you didn't include your organization id in the request")

    Organization.findById organization_id, (err, organization) ->
      if (!organization)
        return res.send(400, "Sorry, we couldn't find your organization :(")

      req.organization = organization
      next(err)

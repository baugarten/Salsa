exports.dash = function(req, res) {
  console.log(req.params);
  res.render('dash', {
    title: 'Dashboard',
    domain: 'http://salsa-fresca.herokuapp.com',
    organization_id: req.params.organization_id
  });
};

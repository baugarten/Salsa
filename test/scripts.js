var should = require('should'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    app = require('../app'),
    utils = require('./support/helper');

describe('Scripts', function() {
  var valid_data;
  before(function(done) {
    utils.seedDb(function(data) {
      valid_data = data; 
      done();
    });
  });
  describe('salsa.picante', function() {
    it('should fail without organization id', function(done) {
      request(app)
        .get('/picante')
        .expect(400, done)
    });
    it('should succeed with an organization id', function(done) {
      request(app)
        .get('/picante?organization_id=' + valid_data['organizations'][0]._id)
        .expect(200)
        .end(function(err, res) {
          res.text.should.match(/document/i);
          res.text.should.match(/getElement/i);
          res.text.should.match(/addEventListener/i);
          done();
        });
    });
  });
});

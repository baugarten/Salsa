var should = require('should'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    app = require('../app');

describe('Users', function() {
  var valid_data = {
    email: 'test@gmail.com',
    password: 'password',
    jobtitle: 'N/A',
    fullname: 'John Smith',
    name: 'Company',
    url: 'http://asdlkjalskdjlakjsd',
    subdomain: 'alksdjasd',
    size: '1',
    phone: '(914) 019283'
  };

  after(function(done) {
    require('./support/helper').clearDb(done);
  });
  it('should be registrable', function(done) {
    request(app)
      .get('/signup')
      .expect(200)
      .end(function(err, res) {
        res.text.should.match(/form/);
        res.text.should.match(/email/i);
        res.text.should.match(/password/i);
        res.text.should.match(/full name/i);
        res.text.should.match(/job title/i);
      });
    request(app)
      .post('/signup')
      .send(valid_data)
      .expect(201)
      .end(function(err, res) {
        done();
      });
  });
  it('should validate required fields', function(done) {
    ['email', 'password', 'jobtitle', 'fullname', 'name', 'url', 'subdomain', 'size', 'phone'].forEach(function(attr) {
      var invalid_data = {};
      for (var key in valid_data) {
        if (key !== attr) {
          invalid_data[key] = valid_data[key];
        }
      }
      request(app)
        .post('/signup')
        .send(invalid_data)
        .expect(400)
        .end(function(err, res) {
          if (attr === 'phone') {
            done();
          } 
        });
    });
  });

});

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    organizations: [ { type: 'ObjectId', ref: 'Organization', required: true } ],
    email: { type: 'string', required: true, unique: true },
    hashed_password: { type: 'string', required: true },
    jobtitle: { type: 'string', required: true },
    fullname: { type: 'string', required: true },
    created: { type: Date, default: Date.now },
    reset_pass_token: { type: 'string', select: false },
    reset_pass_sent_at: { type: Date, select: false },
    sign_in_count: { type: 'number', default: 0 }
});
UserSchema.virtual('password')
  .set(function(password) {
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })

UserSchema.methods = {
  authenticate: function(password) {
    return bcrypt.compareSync(password, this.hashed_password);
  },
  makeSalt: function() {
    return bcrypt.genSaltSync(10);
  },
  encryptPassword: function(password) {
    if (!password) return '';
    return bcrypt.hashSync(password, this.makeSalt());
  }
};

mongoose.model('User', UserSchema);

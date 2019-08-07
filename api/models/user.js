const mongoose = require('mongoose');
var crypto = require('crypto');

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true , unique: true},
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true , unique: true},
  phone: { type: String, required: true , unique: true},
  address: { type: String, required: true },
  city: { type: String, required: true },
  afm:{ type: String, required: true , unique: true}
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

module.exports = mongoose.model('User', userSchema);

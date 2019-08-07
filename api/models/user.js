const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	sender: { type: mongoose.Schema.Types.ObjectId, red: 'User' , required: true},
    receiver: { type: mongoose.Schema.Types.ObjectId, red: 'User' , required: true},
    subject: {type: String, required: true },   
    time: {type: Date},
	text: {type: String, required: true }
});

module.exports = mongoose.model('Message', messageSchema);
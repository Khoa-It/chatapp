const mongoose = require('mongoose')
const mongooseSequence = require('mongoose-sequence')(mongoose)

const schema = new mongoose.Schema({
    room_id: {type: String},
    content: {type: String},
    sender_id: {type: Number},
})

const Messages = mongoose.model('Message', schema);

module.exports = {Messages};